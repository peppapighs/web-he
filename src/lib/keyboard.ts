import {
  KeyboardConfig,
  KeyboardMetadata,
  KeyModeConfig,
  KeyModeId,
  KeySwitchConfig,
  KeySwitchId,
  KeySwitchState
} from '@/types/keyboard'

export const parseKeyMode = (
  data: DataView,
  offset: number
): [KeyModeConfig, number] => {
  const mode = data.getUint8(offset)
  offset += 1
  const actuation_distance = data.getUint16(offset, true)
  offset += 2
  const trigger_distance = data.getUint16(offset, true)
  offset += 2
  const rt_down_distance = data.getUint16(offset, true)
  offset += 2
  const rt_up_distance = data.getUint16(offset, true)
  offset += 2

  if (mode === KeyModeId.KEY_MODE_ACTUATION) {
    return [{ mode, actuation_distance }, offset]
  } else if (mode === KeyModeId.KEY_MODE_RAPID_TRIGGER) {
    return [
      {
        mode,
        actuation_distance,
        trigger_distance,
        rt_down_distance,
        rt_up_distance
      },
      offset
    ]
  } else {
    throw new Error(`Invalid key mode: ${mode}`)
  }
}

export const parseKeySwitchConfig = (
  data: DataView,
  offset: number
): [KeySwitchConfig, number] => {
  const tapping_term = data.getUint16(offset, true)
  offset += 2
  const [key_mode, newOffset] = parseKeyMode(data, offset)

  return [{ tapping_term, key_mode }, newOffset]
}

export const parseKeyboardConfig = (
  keyboardMetadata: KeyboardMetadata,
  data: DataView,
  offset: number
): [KeyboardConfig, number] => {
  const magic = data.getUint32(offset, true)
  offset += 4
  const version = data.getUint16(offset, true)
  offset += 2
  const nkro = data.getUint8(offset) == 1
  offset += 1
  const switch_profile = data.getUint8(offset)
  offset += 1
  const keyboard_profile = data.getUint8(offset)
  offset += 1

  const key_switch_config: KeySwitchConfig[][] = []
  for (let i = 0; i < keyboardMetadata.numProfiles; i++) {
    key_switch_config.push([])
    for (let j = 0; j < keyboardMetadata.numKeys; j++) {
      const [config, newOffset] = parseKeySwitchConfig(data, offset)
      key_switch_config[i].push(config)
      offset = newOffset
    }
  }

  const keymap: number[][][] = []
  for (let i = 0; i < keyboardMetadata.numProfiles; i++) {
    keymap.push([])
    for (let j = 0; j < keyboardMetadata.numLayers; j++) {
      keymap[i].push([])
      for (let k = 0; k < keyboardMetadata.numKeys; k++) {
        keymap[i][j].push(data.getUint16(offset, true))
        offset += 2
      }
    }
  }

  return [
    {
      magic,
      version,
      nkro,
      switch_profile,
      keyboard_profile,
      key_switch_config,
      keymap
    },
    offset
  ]
}

export const parseKeySwitchState = (
  data: DataView,
  offset: number
): [KeySwitchState, number] => {
  const min_value = data.getUint16(offset, true)
  offset += 2
  const max_value = data.getUint16(offset, true)
  offset += 2
  const adc_value = data.getUint16(offset, true)
  offset += 2
  const distance = data.getUint16(offset, true)
  offset += 2
  const peek_distance = data.getUint16(offset, true)
  offset += 2
  const last_press_time = data.getUint32(offset, true)
  offset += 4
  const state = data.getUint8(offset)
  offset += 1
  const pressed = data.getUint8(offset) == 1
  offset += 1

  if (!(state in KeySwitchId)) {
    throw new Error(`Invalid key switch state: ${state}`)
  }

  return [
    {
      min_value,
      max_value,
      adc_value,
      distance,
      peek_distance,
      last_press_time,
      state,
      pressed
    },
    offset
  ]
}
