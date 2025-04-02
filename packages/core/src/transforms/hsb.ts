import type { TransformFactory } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface HSBOptions {
  hue: string
  saturation: string
  brightness: string
}

export let hsb: TransformFactory<HSBOptions> = (config) => {
  let hue = config.hue && parseInt(config.hue)
  let saturation = config.saturation && parseFloat(config.saturation)
  let brightness = config.brightness && parseFloat(config.brightness)

  if (!hue && !saturation && !brightness) return

  return function hsbTransform(image) {
    image[METADATA].hue = hue
    image[METADATA].saturation = saturation
    image[METADATA].brightness = brightness

    return image.modulate({
      hue: hue || 0,
      saturation: saturation || 1,
      brightness: brightness || 1
    })
  }
}
