// src/lib/jsonLines.ts
import type { Json } from '../data/api'

export type TokenKind = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'punct'

export interface Token {
  kind: TokenKind
  text: string
}

export interface JsonLine {
  depth: number
  tokens: Token[]
}

const punct = (text: string): Token => ({ kind: 'punct', text })

function scalar(value: Exclude<Json, object> | null): Token {
  if (value === null) return { kind: 'null', text: 'null' }
  if (typeof value === 'string') return { kind: 'string', text: JSON.stringify(value) }
  if (typeof value === 'number') return { kind: 'number', text: String(value) }
  return { kind: 'boolean', text: String(value) }
}

const isScalar = (v: Json): v is Exclude<Json, object> | null => v === null || typeof v !== 'object'

/**
 * Pretty-prints JSON as tokenized lines (2-space depth), keeping arrays of scalars on
 * one line so short lists like the stack stay readable.
 */
export function jsonLines(value: Json, depth = 0, key?: string, last = true): JsonLine[] {
  const head: Token[] = key === undefined ? [] : [{ kind: 'key', text: JSON.stringify(key) }, punct(': ')]
  const tail: Token[] = last ? [] : [punct(',')]

  if (isScalar(value)) {
    return [{ depth, tokens: [...head, scalar(value), ...tail] }]
  }

  if (Array.isArray(value)) {
    if (value.every(isScalar)) {
      const items = value.flatMap((v, i) => (i === 0 ? [scalar(v)] : [punct(', '), scalar(v)]))
      return [{ depth, tokens: [...head, punct('['), ...items, punct(']'), ...tail] }]
    }
    return [
      { depth, tokens: [...head, punct('[')] },
      ...value.flatMap((v, i) => jsonLines(v, depth + 1, undefined, i === value.length - 1)),
      { depth, tokens: [punct(']'), ...tail] },
    ]
  }

  const entries = Object.entries(value)
  return [
    { depth, tokens: [...head, punct('{')] },
    ...entries.flatMap(([k, v], i) => jsonLines(v, depth + 1, k, i === entries.length - 1)),
    { depth, tokens: [punct('}'), ...tail] },
  ]
}
