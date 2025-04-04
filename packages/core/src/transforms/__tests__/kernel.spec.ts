import { getKernel, KernelValue } from '../kernel'
import { join } from 'path'
import sharp, { Sharp } from 'sharp'
import { describe, beforeEach, expect, test } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('kernel', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    img[METADATA] = { chromaSubsampling: '' }
  })

  test('keyword "kernel"', () => {
    var res = getKernel({ kernel: 'cubic' }, img)

    expect(res).toEqual('cubic')
  })

  test('missing', () => {
    var res = getKernel({}, img)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      var res = getKernel({ kernel: 'invalid' }, img)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      //@ts-expect-error invalid args
      var res = getKernel({ kernel: '' }, img)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      var args: KernelValue[] = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3']

      for (var arg of args) {
        var res = getKernel({ kernel: arg }, img)

        expect(res).toEqual(arg)
      }
    })
  })
})
