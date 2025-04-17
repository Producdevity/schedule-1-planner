import type { ItemType, ItemCategory } from '@/types'

export interface ProductionStats {
  yieldMultiplier: number
  qualityMultiplier: number
  timeMultiplier: number
  efficiency: number // 0-1 scale of how efficient the equipment is
}

export abstract class ProductionEquipment {
  public readonly type: ItemType
  public readonly category: ItemCategory
  public readonly price: number
  public readonly size: [number, number]
  public readonly stats: ProductionStats

  constructor(
    type: ItemType,
    category: ItemCategory,
    price: number,
    size: [number, number],
    stats: ProductionStats
  ) {
    this.type = type
    this.category = category
    this.price = price
    this.size = size
    this.stats = stats
  }

  public abstract calculateProduction(inputs: any[]): any
  public abstract getEfficiency(): number
} 