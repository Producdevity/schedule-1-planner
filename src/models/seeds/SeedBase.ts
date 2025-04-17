import type { ItemBaseCategory, ItemCategory, ItemType } from '@/types'

export type SeedItemType = Extract<
  ItemType,
  'og_kush_seed' | 'sour_diesel_seed' | 'green_crack_seed' | 'granddaddy_purple_seed' | 'coca_seed'
>

export type SeedItemCategory = Extract<ItemCategory, 'weed_seeds' | 'coca_seeds'>

abstract class SeedBase {
  abstract name: string
  abstract type: SeedItemType
  abstract price: number
  abstract itemCategory: SeedItemCategory

  public readonly baseCategory: ItemBaseCategory = 'seeds'
}

export default SeedBase
