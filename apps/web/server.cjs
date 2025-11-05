const path = require("path");
require("dotenv").config({ path: path.resolve("/var/www/vhosts/halitermis.com/.env") });

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('> Ready on http://localhost:' + port)
  })
}).catch(err => {
  console.error('Failed to prepare Next app', err)
  process.exit(1)
})
