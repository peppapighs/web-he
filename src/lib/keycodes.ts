import {
  AlarmClock,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  Calculator,
  FastForward,
  Home,
  Laptop,
  LayoutGrid,
  LayoutPanelLeft,
  Mail,
  Menu,
  Moon,
  Play,
  Power,
  RefreshCw,
  Rewind,
  Search,
  SkipBack,
  SkipForward,
  Square,
  Sun,
  SunDim,
  Volume1,
  Volume2,
  VolumeOff
} from 'lucide-react'

import { Keycode } from '@/constants/keycodes'
import { DisplayedKeycode } from '@/types/keycodes'

export const LCTL = (keycode: number): number => keycode | Keycode.MOD_MASK_CTL
export const LSFT = (keycode: number): number => keycode | Keycode.MOD_MASK_SFT
export const LALT = (keycode: number): number => keycode | Keycode.MOD_MASK_ALT
export const LGUI = (keycode: number): number => keycode | Keycode.MOD_MASK_GUI

export const RCTL = (keycode: number): number => LCTL(keycode) | 0x1000
export const RSFT = (keycode: number): number => LSFT(keycode) | 0x1000
export const RALT = (keycode: number): number => LALT(keycode) | 0x1000
export const RGUI = (keycode: number): number => LGUI(keycode) | 0x1000

export const MM_MODS = (keycode: number): number =>
  ((keycode & 0x0f00) >> 8) << ((keycode & 0x1000) >> 10)
export const MM_KEY = (keycode: number): number => keycode & 0x00ff

export const LCTL_T = (keycode: number): number => keycode | Keycode.MOD_TAP_CTL
export const LSFT_T = (keycode: number): number => keycode | Keycode.MOD_TAP_SFT
export const LALT_T = (keycode: number): number => keycode | Keycode.MOD_TAP_ALT
export const LGUI_T = (keycode: number): number => keycode | Keycode.MOD_TAP_GUI

export const RCTL_T = (keycode: number): number => LCTL_T(keycode) | 0x1000
export const RSFT_T = (keycode: number): number => LSFT_T(keycode) | 0x1000
export const RALT_T = (keycode: number): number => LALT_T(keycode) | 0x1000
export const RGUI_T = (keycode: number): number => LGUI_T(keycode) | 0x1000

export const MT_MODS = (keycode: number): number =>
  ((keycode & 0x0f00) >> 8) << ((keycode & 0x1000) >> 10)
export const MT_KEY = (keycode: number): number => keycode & 0x00ff

export const LT = (layer: number, keycode: number): number =>
  Keycode.LAYER_TAP | (layer << 8) | keycode
export const LT_LAYER = (keycode: number): number => (keycode & 0x0f00) >> 8
export const LT_KEY = (keycode: number): number => keycode & 0x00ff

export const LCTL_LM = (layer: number): number => layer | Keycode.LAYER_MOD_CTL
export const LSFT_LM = (layer: number): number => layer | Keycode.LAYER_MOD_SFT
export const LALT_LM = (layer: number): number => layer | Keycode.LAYER_MOD_ALT
export const LGUI_LM = (layer: number): number => layer | Keycode.LAYER_MOD_GUI

export const RCTL_LM = (layer: number): number => LCTL_LM(layer) | 0x0100
export const RSFT_LM = (layer: number): number => LSFT_LM(layer) | 0x0100
export const RALT_LM = (layer: number): number => LALT_LM(layer) | 0x0100
export const RGUI_LM = (layer: number): number => LGUI_LM(layer) | 0x0100

export const LM_MODS = (keycode: number): number =>
  ((keycode & 0x00f0) >> 4) << ((keycode & 0x0100) >> 6)
export const LM_LAYER = (keycode: number): number => keycode & 0x000f

export const MO = (layer: number): number => Keycode.LAYER_MOMENTARY | layer
export const MO_LAYER = (keycode: number): number => keycode & 0x000f

export const DF = (layer: number): number => Keycode.LAYER_DEFAULT | layer
export const DF_LAYER = (keycode: number): number => keycode & 0x000f

export const TG = (layer: number): number => Keycode.LAYER_TOGGLE | layer
export const TG_LAYER = (keycode: number): number => keycode & 0x000f

export const PS = (profile: number): number => Keycode.PROFILE_SET | profile
export const PS_PROFILE = (keycode: number): number => keycode & 0x000f

const BASIC_KEYCODES: Record<number, DisplayedKeycode> = {
  [Keycode.KC_NO]: {
    display: [''],
    description: 'Nothing',
    code: 'KC_NO'
  },
  [Keycode.KC_TRNS]: {
    display: ['∇'],
    description: 'Pass-through',
    code: 'KC_TRNS'
  },
  [Keycode.KC_A]: {
    display: ['A'],
    code: 'KC_A'
  },
  [Keycode.KC_B]: {
    display: ['B'],
    code: 'KC_B'
  },
  [Keycode.KC_C]: {
    display: ['C'],
    code: 'KC_C'
  },
  [Keycode.KC_D]: {
    display: ['D'],
    code: 'KC_D'
  },
  [Keycode.KC_E]: {
    display: ['E'],
    code: 'KC_E'
  },
  [Keycode.KC_F]: {
    display: ['F'],
    code: 'KC_F'
  },
  [Keycode.KC_G]: {
    display: ['G'],
    code: 'KC_G'
  },
  [Keycode.KC_H]: {
    display: ['H'],
    code: 'KC_H'
  },
  [Keycode.KC_I]: {
    display: ['I'],
    code: 'KC_I'
  },
  [Keycode.KC_J]: {
    display: ['J'],
    code: 'KC_J'
  },
  [Keycode.KC_K]: {
    display: ['K'],
    code: 'KC_K'
  },
  [Keycode.KC_L]: {
    display: ['L'],
    code: 'KC_L'
  },
  [Keycode.KC_M]: {
    display: ['M'],
    code: 'KC_M'
  },
  [Keycode.KC_N]: {
    display: ['N'],
    code: 'KC_N'
  },
  [Keycode.KC_O]: {
    display: ['O'],
    code: 'KC_O'
  },
  [Keycode.KC_P]: {
    display: ['P'],
    code: 'KC_P'
  },
  [Keycode.KC_Q]: {
    display: ['Q'],
    code: 'KC_Q'
  },
  [Keycode.KC_R]: {
    display: ['R'],
    code: 'KC_R'
  },
  [Keycode.KC_S]: {
    display: ['S'],
    code: 'KC_S'
  },
  [Keycode.KC_T]: {
    display: ['T'],
    code: 'KC_T'
  },
  [Keycode.KC_U]: {
    display: ['U'],
    code: 'KC_U'
  },
  [Keycode.KC_V]: {
    display: ['V'],
    code: 'KC_V'
  },
  [Keycode.KC_W]: {
    display: ['W'],
    code: 'KC_W'
  },
  [Keycode.KC_X]: {
    display: ['X'],
    code: 'KC_X'
  },
  [Keycode.KC_Y]: {
    display: ['Y'],
    code: 'KC_Y'
  },
  [Keycode.KC_Z]: {
    display: ['Z'],
    code: 'KC_Z'
  },
  [Keycode.KC_1]: {
    display: ['!', '1'],
    code: 'KC_1'
  },
  [Keycode.KC_2]: {
    display: ['@', '2'],
    code: 'KC_2'
  },
  [Keycode.KC_3]: {
    display: ['#', '3'],
    code: 'KC_3'
  },
  [Keycode.KC_4]: {
    display: ['$', '4'],
    code: 'KC_4'
  },
  [Keycode.KC_5]: {
    display: ['%', '5'],
    code: 'KC_5'
  },
  [Keycode.KC_6]: {
    display: ['^', '6'],
    code: 'KC_6'
  },
  [Keycode.KC_7]: {
    display: ['&', '7'],
    code: 'KC_7'
  },
  [Keycode.KC_8]: {
    display: ['*', '8'],
    code: 'KC_8'
  },
  [Keycode.KC_9]: {
    display: ['(', '9'],
    code: 'KC_9'
  },
  [Keycode.KC_0]: {
    display: [')', '0'],
    code: 'KC_0'
  },
  [Keycode.KC_ENT]: {
    display: ['Enter'],
    code: 'KC_ENT'
  },
  [Keycode.KC_ESC]: {
    display: ['Esc'],
    description: 'Escape',
    code: 'KC_ESC'
  },
  [Keycode.KC_BSPC]: {
    display: ['Bksp'],
    description: 'Backspace',
    code: 'KC_BSPC'
  },
  [Keycode.KC_TAB]: {
    display: ['Tab'],
    code: 'KC_TAB'
  },
  [Keycode.KC_SPC]: {
    display: ['Space'],
    description: 'Spacebar',
    code: 'KC_SPC'
  },
  [Keycode.KC_MINS]: {
    display: ['_', '-'],
    code: 'KC_MINS'
  },
  [Keycode.KC_EQL]: {
    display: ['+', '='],
    code: 'KC_EQL'
  },
  [Keycode.KC_LBRC]: {
    display: ['{', '['],
    code: 'KC_LBRC'
  },
  [Keycode.KC_RBRC]: {
    display: ['}', ']'],
    code: 'KC_RBRC'
  },
  [Keycode.KC_BSLS]: {
    display: ['|', '\\'],
    code: 'KC_BSLS'
  },
  [Keycode.KC_NUSH]: {
    display: ['ISO', '#'],
    code: 'KC_NUSH'
  },
  [Keycode.KC_SCLN]: {
    display: [':', ';'],
    code: 'KC_SCLN'
  },
  [Keycode.KC_QUOT]: {
    display: ['"', "'"],
    code: 'KC_QUOT'
  },
  [Keycode.KC_GRV]: {
    display: ['~', '`'],
    code: 'KC_GRV'
  },
  [Keycode.KC_COMM]: {
    display: ['<', ','],
    code: 'KC_COMM'
  },
  [Keycode.KC_DOT]: {
    display: ['>', '.'],
    code: 'KC_DOT'
  },
  [Keycode.KC_SLSH]: {
    display: ['?', '/'],
    code: 'KC_SLSH'
  },
  [Keycode.KC_CAPS]: {
    display: ['Caps'],
    description: 'Caps Lock',
    code: 'KC_CAPS'
  },
  [Keycode.KC_F1]: {
    display: ['F1'],
    code: 'KC_F1'
  },
  [Keycode.KC_F2]: {
    display: ['F2'],
    code: 'KC_F2'
  },
  [Keycode.KC_F3]: {
    display: ['F3'],
    code: 'KC_F3'
  },
  [Keycode.KC_F4]: {
    display: ['F4'],
    code: 'KC_F4'
  },
  [Keycode.KC_F5]: {
    display: ['F5'],
    code: 'KC_F5'
  },
  [Keycode.KC_F6]: {
    display: ['F6'],
    code: 'KC_F6'
  },
  [Keycode.KC_F7]: {
    display: ['F7'],
    code: 'KC_F7'
  },
  [Keycode.KC_F8]: {
    display: ['F8'],
    code: 'KC_F8'
  },
  [Keycode.KC_F9]: {
    display: ['F9'],
    code: 'KC_F9'
  },
  [Keycode.KC_F10]: {
    display: ['F10'],
    code: 'KC_F10'
  },
  [Keycode.KC_F11]: {
    display: ['F11'],
    code: 'KC_F11'
  },
  [Keycode.KC_F12]: {
    display: ['F12'],
    code: 'KC_F12'
  },
  [Keycode.KC_PSCR]: {
    display: ['Print'],
    description: 'Print Screen',
    code: 'KC_PSCR'
  },
  [Keycode.KC_SCRL]: {
    display: ['Scroll'],
    description: 'Scroll Lock',
    code: 'KC_SCRL'
  },
  [Keycode.KC_PAUS]: {
    display: ['Pause'],
    code: 'KC_PAUS'
  },
  [Keycode.KC_INS]: {
    display: ['Ins'],
    description: 'Insert',
    code: 'KC_INS'
  },
  [Keycode.KC_HOME]: {
    display: ['Home'],
    code: 'KC_HOME'
  },
  [Keycode.KC_PGUP]: {
    display: ['PgUp'],
    description: 'Page Up',
    code: 'KC_PGUP'
  },
  [Keycode.KC_DEL]: {
    display: ['Del'],
    description: 'Delete',
    code: 'KC_DEL'
  },
  [Keycode.KC_END]: {
    display: ['End'],
    code: 'KC_END'
  },
  [Keycode.KC_PGDN]: {
    display: ['PgDn'],
    description: 'Page Down',
    code: 'KC_PGDN'
  },
  [Keycode.KC_RGHT]: {
    display: [ArrowRight],
    description: 'Right Arrow',
    code: 'KC_RGHT'
  },
  [Keycode.KC_LEFT]: {
    display: [ArrowLeft],
    description: 'Left Arrow',
    code: 'KC_LEFT'
  },
  [Keycode.KC_DOWN]: {
    display: [ArrowDown],
    description: 'Down Arrow',
    code: 'KC_DOWN'
  },
  [Keycode.KC_UP]: {
    display: [ArrowUp],
    description: 'Up Arrow',
    code: 'KC_UP'
  },
  [Keycode.KC_NUM]: {
    display: ['Num', 'Lock'],
    description: 'Numpad Lock',
    code: 'KC_NUM'
  },
  [Keycode.KC_PSLS]: {
    display: ['Num', '/'],
    description: 'Numpad Divide',
    code: 'KC_PSLS'
  },
  [Keycode.KC_PAST]: {
    display: ['Num', '*'],
    description: 'Numpad Multiply',
    code: 'KC_PAST'
  },
  [Keycode.KC_PMNS]: {
    display: ['Num', '-'],
    description: 'Numpad Subtract',
    code: 'KC_PMNS'
  },
  [Keycode.KC_PPLS]: {
    display: ['Num', '+'],
    description: 'Numpad Add',
    code: 'KC_PPLS'
  },
  [Keycode.KC_PENT]: {
    display: ['Num', 'Enter'],
    description: 'Numpad Enter',
    code: 'KC_PENT'
  },
  [Keycode.KC_P1]: {
    display: ['Num', '1'],
    description: 'Numpad 1',
    code: 'KC_P1'
  },
  [Keycode.KC_P2]: {
    display: ['Num', '2'],
    description: 'Numpad 2',
    code: 'KC_P2'
  },
  [Keycode.KC_P3]: {
    display: ['Num', '3'],
    description: 'Numpad 3',
    code: 'KC_P3'
  },
  [Keycode.KC_P4]: {
    display: ['Num', '4'],
    description: 'Numpad 4',
    code: 'KC_P4'
  },
  [Keycode.KC_P5]: {
    display: ['Num', '5'],
    description: 'Numpad 5',
    code: 'KC_P5'
  },
  [Keycode.KC_P6]: {
    display: ['Num', '6'],
    description: 'Numpad 6',
    code: 'KC_P6'
  },
  [Keycode.KC_P7]: {
    display: ['Num', '7'],
    description: 'Numpad 7',
    code: 'KC_P7'
  },
  [Keycode.KC_P8]: {
    display: ['Num', '8'],
    description: 'Numpad 8',
    code: 'KC_P8'
  },
  [Keycode.KC_P9]: {
    display: ['Num', '9'],
    description: 'Numpad 9',
    code: 'KC_P9'
  },
  [Keycode.KC_P0]: {
    display: ['Num', '0'],
    description: 'Numpad 0',
    code: 'KC_P0'
  },
  [Keycode.KC_PDOT]: {
    display: ['Num', '.'],
    description: 'Numpad Decimal',
    code: 'KC_PDOT'
  },
  [Keycode.KC_NUBS]: {
    display: ['ISO', '\\'],
    code: 'KC_NUBS'
  },
  [Keycode.KC_APP]: {
    display: [Menu],
    description: 'Menu',
    code: 'KC_APP'
  },
  [Keycode.KC_PEQL]: {
    display: ['Num', '='],
    description: 'Numpad Equal',
    code: 'KC_PEQL'
  },
  [Keycode.KC_F13]: {
    display: ['F13'],
    code: 'KC_F13'
  },
  [Keycode.KC_F14]: {
    display: ['F14'],
    code: 'KC_F14'
  },
  [Keycode.KC_F15]: {
    display: ['F15'],
    code: 'KC_F15'
  },
  [Keycode.KC_F16]: {
    display: ['F16'],
    code: 'KC_F16'
  },
  [Keycode.KC_F17]: {
    display: ['F17'],
    code: 'KC_F17'
  },
  [Keycode.KC_F18]: {
    display: ['F18'],
    code: 'KC_F18'
  },
  [Keycode.KC_F19]: {
    display: ['F19'],
    code: 'KC_F19'
  },
  [Keycode.KC_F20]: {
    display: ['F20'],
    code: 'KC_F20'
  },
  [Keycode.KC_F21]: {
    display: ['F21'],
    code: 'KC_F21'
  },
  [Keycode.KC_F22]: {
    display: ['F22'],
    code: 'KC_F22'
  },
  [Keycode.KC_F23]: {
    display: ['F23'],
    code: 'KC_F23'
  },
  [Keycode.KC_F24]: {
    display: ['F24'],
    code: 'KC_F24'
  },
  [Keycode.KC_EXEC]: {
    display: ['Exec'],
    description: 'Execute',
    code: 'KC_EXEC'
  },
  [Keycode.KC_HELP]: {
    display: ['Help'],
    code: 'KC_HELP'
  },
  [Keycode.KC_MENU]: {
    display: ['Menu'],
    code: 'KC_MENU'
  },
  [Keycode.KC_SLCT]: {
    display: ['Select'],
    code: 'KC_SLCT'
  },
  [Keycode.KC_STOP]: {
    display: ['Stop'],
    code: 'KC_STOP'
  },
  [Keycode.KC_AGIN]: {
    display: ['Again'],
    code: 'KC_AGIN'
  },
  [Keycode.KC_UNDO]: {
    display: ['Undo'],
    code: 'KC_UNDO'
  },
  [Keycode.KC_CUT]: {
    display: ['Cut'],
    code: 'KC_CUT'
  },
  [Keycode.KC_COPY]: {
    display: ['Copy'],
    code: 'KC_COPY'
  },
  [Keycode.KC_PSTE]: {
    display: ['Paste'],
    code: 'KC_PSTE'
  },
  [Keycode.KC_FIND]: {
    display: ['Find'],
    code: 'KC_FIND'
  },
  [Keycode.KC_INT1]: {
    display: ['JIS', '\\'],
    description: 'JIS Backslash',
    code: 'KC_INT1'
  },
  [Keycode.KC_INT2]: {
    display: ['かな'],
    description: 'JIS Katakana/Hiragana/Rōmaji',
    code: 'KC_INT2'
  },
  [Keycode.KC_INT3]: {
    display: ['JIS', '¥'],
    description: 'JIS Yen',
    code: 'KC_INT3'
  },
  [Keycode.KC_INT4]: {
    display: ['変換'],
    description: 'JIS Henkan',
    code: 'KC_INT4'
  },
  [Keycode.KC_INT5]: {
    display: ['無変換'],
    description: 'JIS Muhenkan',
    code: 'KC_INT5'
  },
  [Keycode.KC_LNG1]: {
    display: ['한/영'],
    description: 'Hangul/English',
    code: 'KC_LNG1'
  },
  [Keycode.KC_LNG2]: {
    display: ['한자'],
    description: 'Hanja',
    code: 'KC_LNG2'
  },
  [Keycode.KC_CLR]: {
    display: ['Clear'],
    code: 'KC_CLR'
  },
  [Keycode.KC_PWR]: {
    display: [Power],
    description: 'System Power',
    code: 'KC_PWR'
  },
  [Keycode.KC_WAKE]: {
    display: [AlarmClock],
    description: 'System Wake',
    code: 'KC_WAKE'
  },
  [Keycode.KC_SLEP]: {
    display: [Moon],
    description: 'System Sleep',
    code: 'KC_SLEP'
  },
  [Keycode.KC_BRIU]: {
    display: [Sun],
    description: 'Increase Brightness',
    code: 'KC_BRIU'
  },
  [Keycode.KC_BRID]: {
    display: [SunDim],
    description: 'Decrease Brightness',
    code: 'KC_BRID'
  },
  [Keycode.KC_MPLY]: {
    display: [Play],
    description: 'Play/Pause',
    code: 'KC_MPLY'
  },
  [Keycode.KC_MNXT]: {
    display: [SkipForward],
    description: 'Next Track',
    code: 'KC_MNXT'
  },
  [Keycode.KC_MPRV]: {
    display: [SkipBack],
    description: 'Previous Track',
    code: 'KC_MPRV'
  },
  [Keycode.KC_MSTP]: {
    display: [Square],
    description: 'Stop',
    code: 'KC_MSTP'
  },
  [Keycode.KC_MUTE]: {
    display: [VolumeOff],
    description: 'Mute Volume',
    code: 'KC_MUTE'
  },
  [Keycode.KC_VOLU]: {
    display: [Volume2],
    description: 'Increase Volume',
    code: 'KC_VOLU'
  },
  [Keycode.KC_VOLD]: {
    display: [Volume1],
    description: 'Decrease Volume',
    code: 'KC_VOLD'
  },
  [Keycode.KC_MSEL]: {
    display: ['Media', 'Select'],
    code: 'KC_MSEL'
  },
  [Keycode.KC_MAIL]: {
    display: [Mail],
    description: 'Mail',
    code: 'KC_MAIL'
  },
  [Keycode.KC_CALC]: {
    display: [Calculator],
    description: 'Calculator',
    code: 'KC_CALC'
  },
  [Keycode.KC_MYCM]: {
    display: [Laptop],
    description: 'My Computer',
    code: 'KC_MYCM'
  },
  [Keycode.KC_WSCH]: {
    display: [Search, 'Web'],
    description: 'Web Search',
    code: 'KC_WSCH'
  },
  [Keycode.KC_WHOM]: {
    display: [Home, 'Web'],
    description: 'Web Home',
    code: 'KC_WHOM'
  },
  [Keycode.KC_WBAK]: {
    display: [ArrowBigLeft, 'Web'],
    description: 'Web Back',
    code: 'KC_WBAK'
  },
  [Keycode.KC_WFWD]: {
    display: [ArrowBigRight, 'Web'],
    description: 'Web Forward',
    code: 'KC_WFWD'
  },
  [Keycode.KC_WSTP]: {
    display: [Square, 'Web'],
    description: 'Web Stop',
    code: 'KC_WSTP'
  },
  [Keycode.KC_WREF]: {
    display: [RefreshCw, 'Web'],
    description: 'Web Refresh',
    code: 'KC_WREF'
  },
  [Keycode.KC_WFAV]: {
    display: [Bookmark, 'Web'],
    description: 'Web Bookmark',
    code: 'KC_WFAV'
  },
  [Keycode.KC_EJCT]: {
    display: ['Media', 'Eject'],
    code: 'KC_EJCT'
  },
  [Keycode.KC_MFFD]: {
    display: [FastForward],
    description: 'Fast Forward',
    code: 'KC_MFFD'
  },
  [Keycode.KC_MRWD]: {
    display: [Rewind],
    description: 'Rewind',
    code: 'KC_MRWD'
  },
  [Keycode.KC_MCTL]: {
    display: [LayoutPanelLeft],
    description: 'macOS Mission Control',
    code: 'KC_MCTL'
  },
  [Keycode.KC_LPAD]: {
    display: [LayoutGrid],
    description: 'macOS Launchpad',
    code: 'KC_LPAD'
  },
  [Keycode.KC_LCTL]: {
    display: ['L-Ctrl'],
    description: 'Left Control',
    code: 'KC_LCTL'
  },
  [Keycode.KC_LSFT]: {
    display: ['L-Shift'],
    description: 'Left Shift',
    code: 'KC_LSFT'
  },
  [Keycode.KC_LALT]: {
    display: ['L-Alt'],
    description: 'Left Alt/Option',
    code: 'KC_LALT'
  },
  [Keycode.KC_LGUI]: {
    display: ['L-Win'],
    description: 'Left Windows/Super/Command',
    code: 'KC_LGUI'
  },
  [Keycode.KC_RCTL]: {
    display: ['R-Ctrl'],
    description: 'Right Control',
    code: 'KC_RCTL'
  },
  [Keycode.KC_RSFT]: {
    display: ['R-Shift'],
    description: 'Right Shift',
    code: 'KC_RSFT'
  },
  [Keycode.KC_RALT]: {
    display: ['AltGr'],
    description: 'Right Alt/Option',
    code: 'KC_RALT'
  },
  [Keycode.KC_RGUI]: {
    display: ['R-Win'],
    description: 'Right Windows/Super/Command',
    code: 'KC_RGUI'
  }
}

const displayUnknownKeycode = (keycode: Keycode): DisplayedKeycode => {
  return {
    display: [keycode.toString(16).toUpperCase()],
    description: 'Unknown Keycode',
    code: 'UNKNOWN'
  }
}

export const displayKeycode = (keycode: Keycode): DisplayedKeycode => {
  if (keycode <= Keycode.BASIC_KC_MAX) {
    if (keycode in BASIC_KEYCODES) {
      return BASIC_KEYCODES[keycode]
    }

    return displayUnknownKeycode(keycode)
  } else if (Keycode.MOD_MASK <= keycode && keycode <= Keycode.MOD_MASK_MAX) {
    return {
      display: ['MOD'],
      description: 'Modifier Key',
      code: 'MOD_MASK'
    }
  } else if (Keycode.MOD_TAP <= keycode && keycode <= Keycode.MOD_TAP_MAX) {
    return {
      display: ['MOD', 'TAP'],
      description: 'Modifier-Tap Key',
      code: 'MOD_TAP'
    }
  } else if (Keycode.LAYER_TAP <= keycode && keycode <= Keycode.LAYER_TAP_MAX) {
    return {
      display: ['LAYER', 'TAP'],
      description: 'Layer-Tap',
      code: 'LAYER_TAP'
    }
  } else if (Keycode.LAYER_MOD <= keycode && keycode <= Keycode.LAYER_MOD_MAX) {
    return {
      display: ['LAYER', 'MOD'],
      description: 'Layer-Modifier',
      code: 'LAYER_MOD'
    }
  } else if (
    Keycode.LAYER_MOMENTARY <= keycode &&
    keycode <= Keycode.LAYER_MOMENTARY_MAX
  ) {
    return {
      display: [`MO(${keycode & 0x000f})`],
      description: `Activate Layer ${keycode & 0x000f} when held`,
      code: 'LAYER_MOMENTARY'
    }
  } else if (
    Keycode.LAYER_DEFAULT <= keycode &&
    keycode <= Keycode.LAYER_DEFAULT_MAX
  ) {
    return {
      display: [`DF(${keycode & 0x000f})`],
      description: `Set Layer ${keycode & 0x000f} as default layer`,
      code: 'LAYER_DEFAULT'
    }
  } else if (
    Keycode.LAYER_TOGGLE <= keycode &&
    keycode <= Keycode.LAYER_TOGGLE_MAX
  ) {
    return {
      display: [`TG(${keycode & 0x000f})`],
      description: `Toggle Layer ${keycode & 0x000f} on/off`,
      code: 'LAYER_TOGGLE'
    }
  } else if (
    Keycode.PROFILE_SET <= keycode &&
    keycode <= Keycode.PROFILE_SET_MAX
  ) {
    return {
      display: ['Profile', `${keycode & 0x000f}`],
      description: `Activate Profile ${keycode & 0x000f}`,
      code: 'PROFILE_SET'
    }
  } else {
    return displayUnknownKeycode(keycode)
  }
}
