// src/data/__tests__/avatar.test.ts
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sha = (path: string) => createHash('sha256').update(readFileSync(resolve(__dirname, path))).digest('hex')

describe('avatar_url', () => {
  it('serves the same photo as the hashed asset its ?v= is taken from', () => {
    // AVATAR_URL versions public/murillo.webp with the content hash of src/assets/hero-720.webp.
    // If the two files drift apart, the version would no longer describe the public file.
    expect(sha('../../../public/murillo.webp')).toBe(sha('../../assets/hero-720.webp'))
  })
})
