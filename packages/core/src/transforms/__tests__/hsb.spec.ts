import { hsb } from '../hsb'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, vi, expect, test } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('hue', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "hue"', () => {
    var res = hsb({ hue: '90' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    var res = hsb({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      var res = hsb({ hue: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      var res = hsb({ hue: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      var res = hsb({ hue: '90' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      var res = hsb({ hue: '4.3' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('negative integer', () => {
      var res = hsb({ hue: '-90' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('negative float', () => {
      var res = hsb({ hue: '-4.3' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('45', async () => {
      var { image } = await applyTransforms([hsb({ hue: '45' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('90', async () => {
      var { image } = await applyTransforms([hsb({ hue: '90' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('negative 90', async () => {
      var { image } = await applyTransforms([hsb({ hue: '-90' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('180', async () => {
      var { image } = await applyTransforms([hsb({ hue: '180' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('saturation', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "saturation"', () => {
    var res = hsb({ saturation: '1' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    var res = hsb({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      var res = hsb({ saturation: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      var res = hsb({ saturation: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      var res = hsb({ saturation: '1' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      var res = hsb({ saturation: '0.75' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('0.5', async () => {
      var { image } = await applyTransforms([hsb({ saturation: '0.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1', async () => {
      var { image } = await applyTransforms([hsb({ saturation: '1' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1.5', async () => {
      var { image } = await applyTransforms([hsb({ saturation: '1.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('brightness', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "brightness"', () => {
    var res = hsb({ brightness: '1' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    var res = hsb({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      var res = hsb({ brightness: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      var res = hsb({ brightness: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      var res = hsb({ brightness: '1' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      var res = hsb({ brightness: '0.75' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('0.5', async () => {
      var { image } = await applyTransforms([hsb({ brightness: '0.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1', async () => {
      var { image } = await applyTransforms([hsb({ brightness: '1' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1.5', async () => {
      var { image } = await applyTransforms([hsb({ brightness: '1.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
