# Optimize (and deploy) a Webpack project for Production

(Cloned from `19-heroku-init`)

### (lect.19) Setup the project
1. Install heroku CLI
1. `heroku login`
1. `heroku create` - it will create a new app accessible from the browser
1. `heroku config:set NODE_ENV=production -a <app-name>`
1. `heroku config -a <app-name>` - show all env variables

### (lect.19) Build and run locally
1. The project will use webpack middleware for DEV mode only
1. Build the static distribution files: `npm run build`
1. Run production version locally:
   1. set a `.env` file with production env settings
   1. set a `Procfile` for heroku in order to state the command to use for running the app
   1. run `heroku local` - test the same versions is going to be deployed

### (lect.19) Deploy on Heroku
1. Configure the repository for heroku: https://devcenter.heroku.com/articles/git
   1. `git remote -v` - check the current status
   1. `heroku git:remote -a <app-name>` - add the remote branch
1. Configure multiple remotes: https://jigarius.com/blog/multiple-git-remote-repositories
   1. `git remote add all git@github.com:giacomoratta/webpack4-udemy-19-heroku.git`
   1. `git remote set-url --add --push all git@github.com:giacomoratta/webpack4-udemy-19-heroku.git`
   1. `git remote set-url --add --push all https://git.heroku.com/dry-beach-59238.git`
1. `git push heroku master:master` - push on `heroku` remote repo the local `master:` branch on the remote `:master` branch
   1. or `git push all master` - 'master' or the branch name
   1. or `git push origin master` - 'master' or the branch name
   1. or `git push heroku master` - 'master' or the branch name
   
### (lect.20) CSS for Production
We want to solve the problem of blank page until the CSS is loaded.
1. `npm install mini-css-extract-plugin`
1. create `config/webpack.prod.js`
1. setup the plugin as loader for css
1. minimize css
   1. `options.minimize = true` might be a solution but there is a better one!
   1. move to 'Plugin' section in order to affect the entire bundle
   1. `npm install optimize-css-assets-webpack-plugin`
   1. this plugin will create one single css with less and optimized rules (e.g. combined and no duplications)

### (lect.21) Different ENV with Webpack
- clean main.js and move commented requires to `config/webpack.env.js` (which is the only one who needs of them, for dev purposes)
- add ENV variables with `webpack.DefinePlugin`
- scripts in `package.json` anyway needs of `NODE_ENV=production` for some reason, otherwise they will work in development mode

### (lect.22) JS optimization for Production
- `npm install babel-minify`
   - test library with `$ minify src/main.js -d dist/`
- `npm install babel-minify-webpack-plugin` (in order to use that package with webpack)
   - the js bundle is now very smaller and it is more difficult to do reverse engineering on it
- `npm install uglifyjs-webpack-plugin`
- minify and uglify can produce similar sizes for js bundles

### (lect.23) Asset optimization for Production
- `npm install compression-webpack-plugin` (6.1.1 is the latest for webpack4)
- `heroku local` - in network analysis, we see `.gz` files are not served!
   - heroku server does not support this content-type
   - we need to support it on 'express' level
   - `npm install express-static-gzip`
   - all response headers changed `content-encoding` to 'gzip', and `content-type` is the specific type (e.g. css, js, html)
- better compression with 'brotli'
   - `npm install brotli-webpack-plugin` 

