import type { ItemType } from '@/types'
import { ProductionEquipmentFactory } from './ProductionEquipmentFactory'
import { Pot } from './Pot'
import { GrowLight } from './GrowLight'

export interface ProductionSetup {
  pot: ItemType
  light: ItemType
  seed: ItemType
  fertilizer?: ItemType
}

export interface ProductionStats {
  yield: number
  quality: number
  time: number
  efficiency: number
  waterUsage: number
  powerConsumption: number
}

export class ProductionCalculator {
  private factory: ProductionEquipmentFactory

  constructor() {
    this.factory = ProductionEquipmentFactory.getInstance()
  }

  public calculateProduction(setup: ProductionSetup): ProductionStats {
    const pot = this.factory.getEquipment(setup.pot)
    const light = this.factory.getEquipment(setup.light)

    if (!pot || !light || !(pot instanceof Pot) || !(light instanceof GrowLight)) {
      throw new Error('Invalid equipment setup')
    }

    // Base values (can be adjusted based on game balance)
    const baseYield = 1
    const baseQuality = 1
    const baseTime = 3600 // 1 hour in seconds

    // Calculate combined multipliers
    const yieldMultiplier = pot.stats.yieldMultiplier * light.stats.yieldMultiplier
    const qualityMultiplier = pot.stats.qualityMultiplier * light.stats.qualityMultiplier
    const timeMultiplier = pot.stats.timeMultiplier * light.stats.timeMultiplier

    // Calculate final stats
    return {
      yield: baseYield * yieldMultiplier,
      quality: baseQuality * qualityMultiplier,
      time: baseTime * timeMultiplier,
      efficiency: (pot.getEfficiency() + light.getEfficiency()) / 2,
      waterUsage: pot.getWaterUsage(),
      powerConsumption: light.getPowerConsumption()
    }
  }

  public calculateSetupEfficiency(setup: ProductionSetup): number {
    const stats = this.calculateProduction(setup)
    return stats.efficiency
  }

  public calculateResourceUsage(setup: ProductionSetup): { water: number; power: number } {
    const stats = this.calculateProduction(setup)
    return {
      water: stats.waterUsage,
      power: stats.powerConsumption
    }
  }
} 