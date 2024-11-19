'use client'

import { KEYBOARD_METADATA } from '@/constants/keyboard'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  VENDOR_CLASS_PROTOCOL_VERSION,
  VendorClassId
} from '@/constants/vendor-class'
import { parseKeyboardConfig, parseKeySwitchState } from '@/lib/keyboard'
import { KeyboardConfig, KeySwitchState } from '@/types/keyboard'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface KeyboardUSB {
  device: USBDevice
  intfNum: number
}

export default function Hero() {
  const [keyboard, setKeyboard] = useState<KeyboardUSB | null>(null)
  const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig | null>(
    null
  )

  const pollingRef = useRef<NodeJS.Timeout | null>(null)
  const [switchState, setSwitchState] = useState<KeySwitchState[]>([])

  const connectDevice = async () => {
    const device = await navigator.usb.requestDevice({
      filters: KEYBOARD_METADATA.reduce<USBDeviceFilter[]>(
        (acc, { vendorId, firmwareProductId, bootloaderProductId }) => {
          acc.push({ vendorId, productId: firmwareProductId })
          acc.push({ vendorId, productId: bootloaderProductId })
          return acc
        },
        []
      )
    })

    await device.open()
    if (device.configuration === null) {
      await device.selectConfiguration(1)
    }

    let intfNum = null
    device.configuration?.interfaces?.forEach(intf => {
      intf.alternates.forEach(alt => {
        if (alt.interfaceClass !== 0xff) {
          return
        }

        intfNum = intf.interfaceNumber
      })
    })

    if (intfNum === null) {
      throw new Error('Connected device does not have the required interface')
    }

    await device.claimInterface(intfNum)
    await device.selectAlternateInterface(intfNum, 0)

    const result = await device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: VendorClassId.VENDOR_CLASS_PROTOCOL_VERSION_CHECK,
      value: VENDOR_CLASS_PROTOCOL_VERSION,
      index: intfNum
    })
    if (result.status !== 'ok') {
      throw new Error('Failed to check protocol version')
    }

    setKeyboard({ device, intfNum })

    const configData = await device.controlTransferIn(
      {
        requestType: 'class',
        recipient: 'interface',
        request: VendorClassId.VENDOR_CLASS_GET_KEYBOARD_CONFIG,
        value: 0,
        index: intfNum
      },
      313
    )

    if (configData.status !== 'ok' || configData.data === undefined) {
      throw new Error('Failed to get keyboard config')
    }

    const [config] = parseKeyboardConfig(
      KEYBOARD_METADATA[0],
      configData.data,
      0
    )

    setKeyboardConfig(config)
  }

  const disconnectDevice = async () => {
    if (keyboard === null) {
      return
    }

    await keyboard.device.close()

    setKeyboard(null)
    setKeyboardConfig(null)
  }

  const bootloaderJump = async () => {
    if (keyboard === null) {
      return
    }

    await keyboard.device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: VendorClassId.VENDOR_CLASS_BOOTLOADER_JUMP,
      value: 0,
      index: keyboard.intfNum
    })

    setKeyboard(null)
  }

  const fetchKeyboardConfig = async () => {
    if (keyboard === null) {
      return
    }

    const configData = await keyboard.device.controlTransferIn(
      {
        requestType: 'class',
        recipient: 'interface',
        request: VendorClassId.VENDOR_CLASS_GET_KEYBOARD_CONFIG,
        value: 0,
        index: keyboard.intfNum
      },
      313
    )

    if (configData.status !== 'ok' || configData.data === undefined) {
      throw new Error('Failed to get keyboard config')
    }

    const [config] = parseKeyboardConfig(
      KEYBOARD_METADATA[0],
      configData.data,
      0
    )

    setKeyboardConfig(config)
  }

  const factoryReset = async () => {
    if (keyboard === null) {
      return
    }

    await keyboard.device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: VendorClassId.VENDOR_CLASS_FACTORY_RESET,
      value: 0,
      index: keyboard.intfNum
    })

    await fetchKeyboardConfig()
  }

  const recalibrate = async () => {
    if (keyboard === null) {
      return
    }

    await keyboard.device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: VendorClassId.VENDOR_CLASS_RECALIBRATE,
      value: 0,
      index: keyboard.intfNum
    })
  }

  const nkro = (on: boolean) => async () => {
    if (keyboard === null) {
      return
    }

    await keyboard.device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: VendorClassId.VENDOR_CLASS_SET_NKRO,
      value: on ? 1 : 0,
      index: keyboard.intfNum
    })

    await fetchKeyboardConfig()
  }

  useEffect(() => {
    navigator.usb.addEventListener('disconnect', () => {
      setKeyboard(null)
      setKeyboardConfig(null)
    })

    return () => {
      navigator.usb.removeEventListener('disconnect', () => {
        setKeyboard(null)
        setKeyboardConfig(null)
      })
    }
  }, [])

  useEffect(() => {
    const switchStatePolling = async () => {
      if (keyboard === null) {
        return
      }

      const switchStateData = await keyboard.device.controlTransferIn(
        {
          requestType: 'class',
          recipient: 'interface',
          request: VendorClassId.VENDOR_CLASS_GET_KEY_SWITCH_STATE,
          value: 0,
          index: keyboard.intfNum
        },
        16 * 8
      )

      if (
        switchStateData.status !== 'ok' ||
        switchStateData.data === undefined
      ) {
        throw new Error('Failed to get switch state')
      }

      let offset = 0
      const states: KeySwitchState[] = []
      for (let i = 0; i < 8; i++) {
        const [state, newOffset] = parseKeySwitchState(
          switchStateData.data,
          offset
        )
        states.push(state)
        offset = newOffset
      }

      setSwitchState(states)
    }

    if (pollingRef.current !== null) {
      clearInterval(pollingRef.current)
    }

    if (keyboard !== null) {
      pollingRef.current = setInterval(switchStatePolling, 1000 / 30)
    }

    return () => {
      if (pollingRef.current !== null) {
        clearInterval(pollingRef.current)
      }
    }
  }, [keyboard])

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="text-center">
        <CardTitle>WEB-HE</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center space-x-4">
          {keyboard ? (
            <Button onClick={disconnectDevice}>Disconnect</Button>
          ) : (
            <Button onClick={connectDevice}>Connect</Button>
          )}
        </div>
        {keyboardConfig && switchState.length > 0 && (
          <>
            <div className="grid grid-cols-4 gap-4">
              <Button variant="secondary" onClick={bootloaderJump}>
                Bootloader
              </Button>
              <Button variant="secondary" onClick={factoryReset}>
                Factory Reset
              </Button>
              <Button variant="secondary" onClick={recalibrate}>
                Recalibrate
              </Button>
              <Button variant="secondary" onClick={nkro(!keyboardConfig.nkro)}>
                NKRO {keyboardConfig.nkro ? 'Off' : 'On'}
              </Button>
            </div>
            <div className="flex flex-col items-center">
              {KEYBOARD_METADATA[0].layout.map((row, i) => (
                <div key={i} className="flex">
                  {row.map(({ matrix, w, h, ml, mt }, j) => (
                    <div
                      key={j}
                      className="p-1"
                      style={{
                        width: `${w * 4}rem`,
                        height: `${h * 4}rem`,
                        marginLeft: `${ml * 4}rem`,
                        marginTop: `${mt * 4}rem`
                      }}
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          'h-full w-full',
                          switchState[matrix].pressed ? 'border-4' : 'border'
                        )}
                      >
                        <div>
                          <p className="text-xs">
                            {switchState[matrix].adc_value}
                          </p>
                          <p>
                            {(switchState[matrix].distance / 100).toFixed(2)}
                          </p>
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
