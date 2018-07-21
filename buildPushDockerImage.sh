#! /bin/bash
yarn build:server
heroku container:push --app=rocky-oasis-63117 web
heroku container:release --app=rocky-oasis-63117 web