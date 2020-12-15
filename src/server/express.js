import express from 'express'
import path from 'path'
const server = express()

const isProd = process.env.NODE_ENV === 'production'

// Webpack middleware only in DEV mode!
if (!isProd) {
  const webpack = require('webpack')
  const config = require('../../config/webpack.dev.js')
  const compiler = webpack(config)

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  )

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    compiler,
    config.devServer
  )

  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddlware)
  console.log('Middleware enabled')
}

// In production, heroku will use only files in dist directory
// ...but we need to build them first: npm run build
const staticMiddleware = express.static('dist')
server.use(staticMiddleware)

// env.PORT set by heroku
const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
