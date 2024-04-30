const http = require('http')

const server = http.createServer((request, response) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World\n')
})

server.listen(3333)
