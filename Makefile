all: up

up:
	docker compose pull
	docker compose up -d --build

down:
	docker compose down

cli:
	docker compose run --rm documentation sh

logs:
	docker compose logs -f

check:
	docker compose run -T --rm documentation npm run check

smoke:
	chmod +x tests/smoke.sh
	tests/smoke.sh

# One-time HTTPS setup for the workstation, not for this project alone: the
# certificate covers every *.sparkfabrik.loc local environment. Raneto sends a
# Content Security Policy that upgrades asset requests to HTTPS, so the local
# proxy needs a certificate the browser trusts. Asks for your password.
certs:
	mkcert -install
	spark-http-proxy certs generate "*.sparkfabrik.loc"

# Sparkkit based themes specific commands.
theme-watch:
	chmod +x bin/npm
	bin/npm run watch

theme-build:
	chmod +x bin/npm
	bin/npm run build

theme-scss-lint:
	chmod +x bin/npm
	bin/npm run scss-lint

theme-scss-lint-fix:
	chmod +x bin/npm
	bin/npm run scss-lint-fix

theme-install-dep:
	chmod +x bin/npm
	bin/npm install