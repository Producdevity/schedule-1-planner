import type { ItemType, ItemCategory } from '@/types'
import { Quality } from './Quality'
import { Efficiency } from './Efficiency'
import { Resource } from './Resource'

export interface FacilityStats {
  size: [number, number]
  price: number
  baseQuality: Quality
  baseEfficiency: Efficiency
  resourceConsumption: Map<Resource, number>
}

export abstract class ProductionFacility {
  public readonly type: ItemType
  public readonly category: ItemCategory
  protected readonly stats: FacilityStats

  constructor(
    type: ItemType,
    category: ItemCategory,
    stats: FacilityStats
  ) {
    this.type = type
    this.category = category
    this.stats = stats
  }

  public getSize(): [number, number] {
    return this.stats.size
  }

  public getPrice(): number {
    return this.stats.price
  }

  public getBaseQuality(): Quality {
    return this.stats.baseQuality
  }

  public getBaseEfficiency(): Efficiency {
    return this.stats.baseEfficiency
  }

  public getResourceConsumption(resource: Resource): number {
    return this.stats.resourceConsumption.get(resource) ?? 0
  }

  public abstract calculateProduction(inputs: Map<ItemType, number>): Map<ItemType, number>
  public abstract getQualityMultiplier(): number
  public abstract getEfficiencyMultiplier(): number
  public abstract getTimeMultiplier(): number
} 