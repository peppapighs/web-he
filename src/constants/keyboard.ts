import { KeyboardMetadata } from '@/types/keyboard'

export const KEYBOARD_METADATA: KeyboardMetadata[] = [
  {
    name: 'HE8',
    description: '8-key Hall-effect keypad',
    vendorId: 0xbeef,
    bootloaderProductId: 0xdf01,
    firmwareProductId: 0xab01,
    numProfiles: 2,
    numLayers: 4,
    numKeys: 8,
    layout: [
      [
        { matrix: 0, w: 1, h: 1, mt: 0, ml: 0 },
        { matrix: 1, w: 1, h: 1, mt: 0, ml: 0 },
        { matrix: 2, w: 1, h: 1, mt: 0, ml: 0 },
        { matrix: 3, w: 1, h: 1, mt: 0, ml: 0 }
      ],
      [
        { matrix: 4, w: 1, h: 1, mt: 0, ml: 0 },
        { matrix: 5, w: 1, h: 1, mt: 0, ml: 0 },
        { matrix: 6, w: 1, h: 1, mt: 0, ml: 0 },
        { matrix: 7, w: 1, h: 1, mt: 0, ml: 0 }
      ]
    ]
  }
]
