/**
 *
 * @param {String} path
 */
export function buildRoutePath(path) {
  // /users/:id
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  )
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
