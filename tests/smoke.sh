#!/usr/bin/env bash
#
# Smoke test for the playbook production image.
#
# Builds the Dockerfile "prod" stage (the stage Cloud Run deploys), starts
# the container and asserts that key pages, theme assets and heading anchors
# render correctly.
#
# Runs on macOS and Linux hosts. Requires docker and curl.

set -euo pipefail

IMAGE_TAG="playbook-smoke:local"
CONTAINER_NAME="playbook-smoke-$$"
HOST_PORT="${SMOKE_PORT:-8087}"
BASE_URL="http://localhost:${HOST_PORT}"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

fail() {
  echo "FAIL: $*" >&2
  docker logs "$CONTAINER_NAME" 2>/dev/null | tail -20 || true
  exit 1
}

cleanup() {
  docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "==> Building prod image"
docker build --target prod -t "$IMAGE_TAG" "$REPO_ROOT"

echo "==> Verifying the theme bundle is present in the image"
docker run --rm --entrypoint sh "$IMAGE_TAG" -c \
  'test -s themes/spark-playbook/public/dist/style.css &&
   test -s themes/spark-playbook/public/dist/app.js' ||
  fail "theme bundle (public/dist) missing from the built image"
echo "OK: theme bundle present"

echo "==> Starting container"
docker run -d --name "$CONTAINER_NAME" -p "${HOST_PORT}:80" "$IMAGE_TAG" >/dev/null

echo "==> Waiting for the server"
started=""
i=0
while [ "$i" -lt 30 ]; do
  if curl -fsS -o /dev/null "$BASE_URL/"; then
    started="yes"
    break
  fi
  i=$((i + 1))
  sleep 2
done
[ -n "$started" ] || fail "server did not answer on $BASE_URL within 60s"
echo "OK: server up"

check_page() {
  url="$1"
  expected="${2:-200}"
  code="$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL$url")"
  [ "$code" = "$expected" ] || fail "$url returned $code, expected $expected"
  echo "OK: $url -> $code"
}

echo "==> Checking key pages"
# Section paths are not routes in Raneto: the menu links directly to pages,
# so the checks below only use real page URLs from different sections.
check_page "/"
check_page "/tools-and-policies/certification-study-time"
check_page "/ai-development/overview"
check_page "/guides/an-introduction-to-docker"
check_page "/this-page-does-not-exist" 404

echo "==> Checking theme assets over HTTP"
check_page "/dist/style.css"
check_page "/dist/app.js"

echo "==> Checking heading anchor IDs (live raneto patch behavior)"
curl -fsS "$BASE_URL/tools-and-policies/certification-study-time" |
  grep -q '<h2 id="' ||
  fail "no heading anchor IDs rendered: raneto patch behavior missing"
echo "OK: heading anchors render"

echo "==> Smoke test passed"
