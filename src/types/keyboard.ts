export interface KeyLayout {
  x: number
  y: number
  w: number
  h: number
}

export type KeyboardLayout = Array<KeyLayout>

export interface KeyboardMetadata {
  name: string
  description: string
  vendorId: number
  bootloaderProductId: number
  firmwareProductId: number
  numLayers: number
  numProfiles: number
  layout: KeyboardLayout
}
