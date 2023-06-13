
all: theme-install-dep theme-build up

up:
	docker-compose pull
	docker-compose up -d

cli:
	docker-compose run --rm documentation bash

logs:
	docker-compose logs -f

check:
	npx --yes markdown-link-validator ./content

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