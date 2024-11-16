import { LucideIcon } from 'lucide-react'

export interface DisplayedKeycode {
  display: (string | LucideIcon)[]
  description?: string
  code: string
}
