export const VENDOR_CLASS_PROTOCOL_VERSION = 0x0100

export enum VendorClassId {
  VENDOR_CLASS_PROTOCOL_VERSION_CHECK = 0x01,
  VENDOR_CLASS_BOOTLOADER_JUMP = 0x02,
  VENDOR_CLASS_FACTORY_RESET = 0x03,
  VENDOR_CLASS_GET_KEYBOARD_CONFIG = 0x04,
  VENDOR_CLASS_SET_KEY_SWITCH_CONFIG = 0x05,
  VENDOR_CLASS_RESET_KEY_SWITCH_CONFIG = 0x06,
  VENDOR_CLASS_SET_KEYMAP = 0x07,
  VENDOR_CLASS_RESET_KEYMAP = 0x08,
  VENDOR_CLASS_SET_SWITCH_PROFILE = 0x09,
  VENDOR_CLASS_GET_KEY_SWITCH_STATE = 0x0a
}
