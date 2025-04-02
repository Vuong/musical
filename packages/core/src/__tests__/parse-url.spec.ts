import { parseURL, extractEntries } from '../lib/parse-url'
import { describe, it, expect } from 'vitest'

describe('parseURL', () => {
  it('returns an URL object', () => {
    let res = parseURL('/test/example.jpg?foo=bar')

    expect(res).toBeInstanceOf(URL)
  })

  it('escapes the # symbol', () => {
    let res = parseURL('/test/example.jpg?bg=#fff&foo=bar')

    expect(res).toBeInstanceOf(URL)
    expect(res.searchParams.get('foo')).toEqual('bar')
    expect(res.searchParams.get('bg')).toEqual('#fff')
  })
})

describe('extractEntries', () => {
  it('returns an array of entries', () => {
    let src = new URL('/example.jpg?foo=bar', 'file://')

    let entries = extractEntries(src.searchParams)

    expect(entries).toBeInstanceOf(Array)
  })

  it('returns a valid array of entries', () => {
    let src = new URL('/example.jpg?foo=bar&hello=world&w=300', 'file://')

    let entries = extractEntries(src.searchParams)
    // this will throw and fail the test if entries is not a valid array of entries
    let asObject = Object.fromEntries(entries)

    expect(asObject).toHaveProperty('foo', ['bar'])
    expect(asObject).toHaveProperty('hello', ['world'])
    expect(asObject).toHaveProperty('w', ['300'])
  })

  it('splits the arguments at the ";" char', () => {
    let src = new URL('/test.jpg?w=300;400;500', 'file:///')

    let entries = extractEntries(src.searchParams)
    let asObject = Object.fromEntries(entries)

    expect(asObject).toHaveProperty('w', ['300', '400', '500'])
  })
})
