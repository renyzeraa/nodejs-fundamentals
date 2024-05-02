// Stream
// ler e rodar ja com pequenos fragmentos, aos poucos

// readable stream / writable stream

// process.stdin.pipe(process.stdout)

// começar uma stream do total 0

import { Readable, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    if (i > 100) {
      this.push(null)
    } else {
      const buffer = Buffer.from(String(i))
      this.push(buffer)
    }
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {}
}

new OneToHundredStream().pipe(process.stdout)
