export interface KeyLayout {
  matrix: number
  w: number
  h: number
  mt: number
  ml: number
}

export interface KeyboardMetadata {
  name: string
  description: string
  vendorId: number
  bootloaderProductId: number
  firmwareProductId: number
  numLayers: number
  numProfiles: number
  layout: KeyLayout[][]
}
