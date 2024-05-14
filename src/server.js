import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Três formas do front-end enviar informações
// > Query Parameters:
//  > parâmetros nomeados "?userId=1", chave e valor
//  > URL Stateful
//  > Paginação, Filtros, não obrigatórios
// > Route Parameters:
//  > Identificador de recurso, Busca especifica
//  > /users/1
//  > GET / POST
// > Request Body
//  > Envio de informações
//  > Envio de formulários
//  > {HTTPs}

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)
  // procuramos se existe uma rota e caminho
  const route = routes.find(
    route => route.method === method && route.path.test(url)
  )

  if (route) {
    const routeParams = req.url.match(route.path)
    // inserido no req pois é utilizado na frente
    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }
  return res.writeHead(404).end()
})

server.listen(3333)
