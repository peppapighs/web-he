'use client'

import { KEYBOARD_METADATA } from '@/constants/keyboard'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  VENDOR_CLASS_PROTOCOL_VERSION,
  VendorClassId
} from '@/constants/vendor-class'
import { parseKeyboardConfig } from '@/lib/keyboard'

export default function Hero() {
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
      await device.controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: VendorClassId.VENDOR_CLASS_PROTOCOL_VERSION_CHECK,
        value: VENDOR_CLASS_PROTOCOL_VERSION,
        index: intfNum
      })
      console.log('Connected device:', device)

      const configLengthData = await device.controlTransferIn(
        {
          requestType: 'class',
          recipient: 'interface',
          request: VendorClassId.VENDOR_CLASS_GET_KEYBOARD_CONFIG_LENGTH,
          value: 0,
          index: intfNum
        },
        2
      )

      if (configLengthData.data === undefined) {
        throw new Error('Failed to get keyboard config length')
      }

      const configLength = configLengthData.data.getUint16(0, true)

      const configData = await device.controlTransferIn(
        {
          requestType: 'class',
          recipient: 'interface',
          request: VendorClassId.VENDOR_CLASS_GET_KEYBOARD_CONFIG,
          value: 0,
          index: intfNum
        },
        configLength
      )

      if (configData.data === undefined) {
        throw new Error('Failed to get keyboard config')
      }

      const [config, offset] = parseKeyboardConfig(
        KEYBOARD_METADATA[0],
        configData.data,
        0
      )

      if (offset !== configLength) {
        throw new Error('Failed to parse keyboard config')
      }

      console.log('Keyboard config:', config)
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
      </CardContent>
    </Card>
  )
}
