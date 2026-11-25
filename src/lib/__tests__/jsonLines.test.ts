// src/lib/__tests__/jsonLines.test.ts
import { jsonLines, type JsonLine } from '../jsonLines'

const text = (lines: JsonLine[]) => lines.map(l => '  '.repeat(l.depth) + l.tokens.map(t => t.text).join('')).join('\n')

describe('jsonLines', () => {
  it('matches JSON.stringify for nested objects and arrays of objects', () => {
    const value = { a: 'x', b: { c: 1, d: true, e: null }, f: [{ g: 'h' }] }
    expect(text(jsonLines(value))).toBe(JSON.stringify(value, null, 2))
  })

  it('keeps arrays of scalars on a single line', () => {
    const lines = jsonLines({ stack: ['Java', 'NestJS'] })
    expect(lines).toHaveLength(3)
    expect(lines[1].tokens.map(t => t.text).join('')).toBe('"stack": ["Java", "NestJS"]')
  })

  it('tags token kinds for syntax colors', () => {
    const kinds = jsonLines({ k: 'v', n: 2, b: false })
      .flatMap(l => l.tokens)
      .filter(t => t.kind !== 'punct')
      .map(t => t.kind)
    expect(kinds).toEqual(['key', 'string', 'key', 'number', 'key', 'boolean'])
  })

  it('escapes quotes inside strings', () => {
    const [line] = jsonLines('say "hi"')
    expect(line.tokens[0].text).toBe('"say \\"hi\\""')
  })
})
