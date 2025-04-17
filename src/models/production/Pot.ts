import type { ItemType, ItemCategory } from '@/types'
import { ProductionEquipment, ProductionStats } from './ProductionEquipment'

export interface PotStats extends ProductionStats {
  waterUsage: number // Water usage per hour
  waterRetention: number // How well the pot retains water (0-1)
}

export abstract class Pot extends ProductionEquipment {
  protected readonly potStats: PotStats

  constructor(
    type: ItemType,
    category: ItemCategory,
    price: number,
    size: [number, number],
    stats: PotStats
  ) {
    super(type, category, price, size, stats)
    this.potStats = stats
  }

  public getWaterUsage(): number {
    return this.potStats.waterUsage
  }

  public getWaterRetention(): number {
    return this.potStats.waterRetention
  }

  public getEfficiency(): number {
    return this.stats.efficiency
  }
}

export class PlasticPot extends Pot {
  constructor() {
    super(
      'plastic_pot',
      'agriculture',
      20,
      [2, 2],
      {
        yieldMultiplier: 1,
        qualityMultiplier: 1,
        timeMultiplier: 1,
        efficiency: 0.7,
        waterUsage: 1,
        waterRetention: 0.5
      }
    )
  }

  public calculateProduction(inputs: any[]): any {
    // Implementation will be added when we integrate with the grow system
    return null
  }
}

export class MoisturePreservingPot extends Pot {
  constructor() {
    super(
      'moisture_preserving_pot',
      'agriculture',
      50,
      [2, 2],
      {
        yieldMultiplier: 1,
        qualityMultiplier: 1.2,
        timeMultiplier: 1,
        efficiency: 0.85,
        waterUsage: 0.7,
        waterRetention: 0.8
      }
    )
  }

  public calculateProduction(inputs: any[]): any {
    // Implementation will be added when we integrate with the grow system
    return null
  }
}

export class AirPot extends Pot {
  constructor() {
    super(
      'air_pot',
      'agriculture',
      120,
      [2, 2],
      {
        yieldMultiplier: 1.2,
        qualityMultiplier: 1.3,
        timeMultiplier: 0.9,
        efficiency: 0.95,
        waterUsage: 0.5,
        waterRetention: 0.9
      }
    )
  }

  public calculateProduction(inputs: any[]): any {
    // Implementation will be added when we integrate with the grow system
    return null
  }
} 