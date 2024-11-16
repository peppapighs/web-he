import { KeyboardMetadata } from '@/types/keyboard'

export const USB_DEVICES: KeyboardMetadata[] = [
  {
    name: 'HE8',
    description: '8-key Hall-effect keypad',
    vendorId: 0xbeef,
    bootloaderProductId: 0xdf01,
    firmwareProductId: 0xab01,
    numLayers: 4,
    numProfiles: 4,
    layout: [
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 3, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 },
      { x: 1, y: 1, w: 1, h: 1 },
      { x: 2, y: 1, w: 1, h: 1 },
      { x: 3, y: 1, w: 1, h: 1 }
    ]
  }
]
