(Cloned from `19-heroku-init`)

### Setup the project
1. Install heroku CLI
1. `heroku login`
1. `heroku create` - it will create a new app accessible from the browser
1. `heroku config:set NODE_ENV=production -a <app-name>`
1. `heroku config -a <app-name>` - show all env variables

### Build and run locally
1. The project will use webpack middleware for DEV mode only
1. Build the static distribution files: `npm run build`
1. Run production version locally:
   1. set a `.env` file with production env settings
   1. set a `Procfile` for heroku in order to state the command to use for running the app
   1. run `heroku local`