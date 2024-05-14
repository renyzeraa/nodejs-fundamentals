import fs from 'node:fs/promises'

const dataBasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(dataBasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row =>
        Object.entries(search).some(([key, value]) => {
          value = value.toLowerCase()
          const dataValue = row[key].toLowerCase()
          return dataValue.includes(value)
        })
      )
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    const index = this.#database[table].findIndex(item => item.id === id)
    if (index > -1) {
      this.#database[table].splice(index, 1)
      this.#persist()
    }
    return index > -1
  }

  update(table, id, data) {
    const index = this.#database[table].findIndex(item => item.id === id)
    if (index > -1) {
      this.#database[table][index] = { id, ...data }
      this.#persist()
    }
    return index > -1
  }
}
