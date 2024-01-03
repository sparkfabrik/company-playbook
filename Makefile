all: up

up:
	docker compose pull
	docker compose up -d

cli:
	docker compose run --rm documentation sh

logs:
	docker compose logs -f

check:
	docker compose run -T --rm documentation npm run check

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