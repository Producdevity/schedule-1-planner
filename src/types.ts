import { type UniqueIdentifier } from '@dnd-kit/core'

interface Placeable {
  id: UniqueIdentifier
}

export interface GridItem extends Placeable {
  x: number
  y: number
  width: number
  height: number
  type: string
}

type ItemType =
  | 'grow_tent'
  | 'packaging_station'
  | 'packaging_station_mk2'
  | 'bed'
  | 'coffee_table'
  | 'wooden_square_table'
  | 'metal_square_table'
  | 'floor_lamp'
  | 'TV'
  | 'small_storage_rack'
  | 'medium_storage_rack'
  | 'large_storage_rack'
  | 'display_cabinet'
  | 'trash_can'
  | 'pot_sprinkler'
  | 'mixing_station'
  | 'soil_pourer'

export type ItemCategory = 'agriculture' | 'furniture' | 'storage' | 'none' | 'agriculture_tool'

export interface Item {
  type: ItemType
  category: ItemCategory
  price: number
  size: [number, number]
}
