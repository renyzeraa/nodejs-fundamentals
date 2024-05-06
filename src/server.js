import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  const route = routes.find(
    route => route.method === method && route.path === url
  )
  await json(req, res)

  if (route) {
    return route.handler(req, res)
  }
})

server.listen(3333)
