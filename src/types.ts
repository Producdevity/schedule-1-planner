import { type UniqueIdentifier } from '@dnd-kit/core'

interface Placeable {
  id: UniqueIdentifier
}

export interface Item extends Placeable {
  x: number
  y: number
  width?: number
  height?: number
  type?: string
}

export interface CatalogItem {
  type: string
  width: number
  height: number
  label: string
  color: string
}
