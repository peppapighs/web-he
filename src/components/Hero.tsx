'use client'

import { KEYBOARD_METADATA } from '@/constants/keyboard'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  VENDOR_CLASS_PROTOCOL_VERSION,
  VendorClassId
} from '@/constants/vendor-class'
import { parseKeyboardConfig, parseKeySwitchState } from '@/lib/keyboard'
import { KeySwitchState } from '@/types/keyboard'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Hero() {
  const [switchState, setSwitchState] = useState<KeySwitchState[]>([])

  const connectDevice = async () => {
    try {
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
      let endpointIn = null
      let endpointOut = null
      device.configuration?.interfaces?.forEach(intf => {
        intf.alternates.forEach(alt => {
          if (alt.interfaceClass !== 0xff) {
            return
          }

          intfNum = intf.interfaceNumber
          alt.endpoints.forEach(endpoint => {
            if (endpoint.direction === 'in') {
              endpointIn = endpoint
            } else if (endpoint.direction === 'out') {
              endpointOut = endpoint
            }
          })
        })
      })

      if (intfNum === null || endpointIn === null || endpointOut === null) {
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

      console.log('Connected device:', device)

      const configData = await device.controlTransferIn(
        {
          requestType: 'class',
          recipient: 'interface',
          request: VendorClassId.VENDOR_CLASS_GET_KEYBOARD_CONFIG,
          value: 0,
          index: intfNum
        },
        312
      )

      if (configData.status !== 'ok' || configData.data === undefined) {
        throw new Error('Failed to get keyboard config')
      }

      const [config] = parseKeyboardConfig(
        KEYBOARD_METADATA[0],
        configData.data,
        0
      )

      console.log('Keyboard config:', config)

      while (true) {
        const switchStateData = await device.controlTransferIn(
          {
            requestType: 'class',
            recipient: 'interface',
            request: VendorClassId.VENDOR_CLASS_GET_KEY_SWITCH_STATE,
            value: 0,
            index: intfNum
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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle>WEB-HE</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4">
          <Button onClick={connectDevice}>Connect</Button>
          <Button variant="secondary">Demo</Button>
        </div>
        <div className="mt-6 flex flex-col">
          {switchState.length > 0 &&
            KEYBOARD_METADATA[0].layout.map((row, i) => (
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
                      {(switchState[matrix].distance / 100).toFixed(2)}
                    </Button>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
