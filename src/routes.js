import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

/**
 * Rotas da API.
 * @typedef {Object} Route
 * @property {string} method - O método HTTP da rota (por exemplo, 'GET', 'POST', etc.).
 * @property {string} path - O caminho da rota (por exemplo, '/users').
 * @property {function} handler - O manipulador de requisição para a rota.
 * @param {Object} req - O objeto de requisição HTTP.
 * @param {Object} res - O objeto de resposta HTTP.
 * @returns {void}
 */

/**
 * Matriz contendo definições de rotas da API.
 * @type {Array<Route>}
 */
export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    /**
     * Manipulador de requisição para a rota de obtenção de usuários.
     * @param {Object} req - O objeto de requisição HTTP.
     * @param {Object} res - O objeto de resposta HTTP.
     * @returns {void}
     */
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    /**
     * Manipulador de requisição para a rota de criação de usuário.
     * @param {Object} req - O objeto de requisição HTTP.
     * @param {Object} res - O objeto de resposta HTTP.
     * @returns {void}
     */
    handler: (req, res) => {
      const { name, email } = req.body
      database.insert('users', {
        id: randomUUID(),
        name,
        email
      })
      return res.end('Criação de usuário')
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    /**
     * Manipulador de requisição para a rota de criação de usuário.
     * @param {Object} req - O objeto de requisição HTTP.
     * @param {Object} res - O objeto de resposta HTTP.
     * @returns {void}
     */
    handler: (req, res) => {
      if (database.delete('users', req.params.id)) {
        return res.writeHead(204).end('Remoção de usuário')
      }
      return res.writeHead(404).end('Usuário não encontrado')
    }
  }
]
