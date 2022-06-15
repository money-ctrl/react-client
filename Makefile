include .env
export $(shell sed 's/=.*//' .env)

run:
	docker-compose up

down:
	docker-compose down

bash:
	docker-compose run ctrl-money "bash"

startup:
	npm install
	npm run start
