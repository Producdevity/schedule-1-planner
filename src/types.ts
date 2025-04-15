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
  | 'bed'
  | 'grow_tent'
  | 'packaging_station'
  | 'packaging_station_mk2'
  | 'mixing_station'
  | 'mixing_station_mk2'
  | 'small_storage_rack'
  | 'medium_storage_rack'
  | 'large_storage_rack'
  | 'coffee_table'
  | 'wooden_square_table'
  | 'metal_square_table'
  | 'plastic_pot'
  | 'moisture_preserving_pot'
  | 'suspension_rack'
  | 'halogen_grow_light'
  | 'led_grow_light'
  | 'full_spectrum_grow_light'
  | 'chemistry_station'
  | 'lab_oven'
  | 'air_pot'
  | 'drying_rack'
  | 'brick_press'
  | 'cauldron'
  | 'floor_lamp'
  | 'tv'
  | 'display_cabinet'
  | 'trash_can'
  | 'pot_sprinkler'
  | 'soil_pourer'
  | 'acid'
  | 'phosphorus'
  | 'gasoline'
  | 'soil'
  | 'long_life_soil'
  | 'extra_long_life_soil'
  | 'baggie'
  | 'jar'
  | 'cuke'
  | 'banana'
  | 'paracetamol'
  | 'donut'
  | 'trash_bag'
  | 'viagra'
  | 'mouth_wash'
  | 'flu_medicine'
  | 'energy_drink'
  | 'motor_oil'
  | 'mega_bean'
  | 'chili'
  | 'battery'
  | 'iodine'
  | 'addy'
  | 'horse_semen'

export type ItemCategory =
  | 'agriculture'
  | 'furniture'
  | 'storage'
  | 'none'
  | 'agriculture_tool'
  | 'packaging'
  | 'ingredients'
  | 'lights'
  | 'tools'

export interface Item {
  type: ItemType
  category: ItemCategory
  price: number
  size: [number, number]
}
