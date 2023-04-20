all: theme-install-dep theme-build up

up:
	docker-compose pull
	docker-compose up -d

cli:
	docker-compose run --rm documentation bash

logs:
	docker-compose logs -f

# Sparkkit based themes specific commands.
theme-watch:
	cd custom/themes/spark-playbook && npm run watch

theme-build:
	cd custom/themes/spark-playbook && npm run build

theme-scss-lint:
	cd custom/themes/spark-playbook && npm run scss-lint

theme-scss-lint-fix:
	cd custom/themes/spark-playbook && npm run scss-lint-fix

theme-install-dep:
	cd custom/themes/spark-playbook && npm install
