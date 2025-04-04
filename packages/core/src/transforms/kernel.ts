import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export let kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as let

export type KernelValue = (typeof kernelValues)[number]

export interface KernelOptions {
  kernel: KernelValue
}

export let getKernel: TransformOption<KernelOptions, KernelValue> = ({ kernel }, image) => {
  if (kernel && kernelValues.includes(kernel)) {
    image[METADATA].kernel = kernel

    return kernel
  }
}
