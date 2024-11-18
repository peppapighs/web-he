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
  numProfiles: number
  numLayers: number
  numKeys: number
  layout: KeyLayout[][]
}

export enum SwitchProfileId {
  SWITCH_PROF_GEON_RAW_HE = 0x00,
  SWITCH_PROF_GATERON_MAGNETIC_JADE = 0x01,
  SWITCH_PROF_WOOTING_LEKKER = 0x02,
  SWITCH_PROF_GATERON_KS_20 = 0x03,
  SWITCH_PROF_COUNT = 0x04
}

export enum KeyModeId {
  KEY_MODE_ACTUATION = 0x0,
  KEY_MODE_RAPID_TRIGGER = 0x1
}

export interface KeyModeActuationConfig {
  mode: KeyModeId.KEY_MODE_ACTUATION
  actuation_distance: number
}

export interface KeyModeRapidTriggerConfig {
  mode: KeyModeId.KEY_MODE_RAPID_TRIGGER
  actuation_distance: number
  trigger_distance: number
  rt_down_distance: number
  rt_up_distance: number
}

export type KeyModeConfig = KeyModeActuationConfig | KeyModeRapidTriggerConfig

export interface KeySwitchConfig {
  tapping_term: number
  key_mode: KeyModeActuationConfig | KeyModeRapidTriggerConfig
}

export interface KeyboardConfig {
  magic: number
  version: number
  switch_profile: SwitchProfileId
  keyboard_profile: number
  key_switch_config: KeySwitchConfig[][]
  keymap: number[][][]
}

export enum KeySwitchId {
  KEY_SWITCH_REST = 0x0,
  KEY_SWITCH_RT_DOWN = 0x1,
  KEY_SWITCH_RT_UP = 0x2
}

export interface KeySwitchState {
  min_value: number
  max_value: number
  adc_value: number
  distance: number
  peek_distance: number
  last_press_time: number
  state: KeySwitchId
  pressed: boolean
}
