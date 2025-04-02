import { blur } from '../blur'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeAll, beforeEach, test, expect, vi } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('blur', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "blur"', () => {
    var res = blur({ blur: '3' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    var res = blur({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      var res = blur({ blur: 'invalid arg' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      var res = blur({ blur: '' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      var res = blur({ blur: 'true' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('integer', () => {
      var res = blur({ blur: '5' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      var res = blur({ blur: '3.5' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('true', async () => {
      var { image } = await applyTransforms([blur({ blur: 'true' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('0.5', async () => {
      var { image } = await applyTransforms([blur({ blur: '0.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('5', async () => {
      var { image } = await applyTransforms([blur({ blur: '5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('50', async () => {
      var { image } = await applyTransforms([blur({ blur: '50' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
