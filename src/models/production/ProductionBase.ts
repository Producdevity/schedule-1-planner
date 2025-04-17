import type { ItemBaseCategory, ItemCategory, ItemType } from '@/types'

abstract class ProductionBase {
  abstract type: ItemType
  abstract itemCategory: ItemCategory
  abstract price: number
  abstract allowedInputs: ItemType[][]

  public readonly baseCategory: ItemBaseCategory = 'production'
}

export default ProductionBase
