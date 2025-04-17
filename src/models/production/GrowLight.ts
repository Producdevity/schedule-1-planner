import type { ItemType, ItemCategory } from '@/types'
import { ProductionEquipment, ProductionStats } from './ProductionEquipment'

export interface GrowLightStats extends ProductionStats {
  powerConsumption: number // Power consumption in watts
  lightSpectrum: number[] // RGB values for light spectrum
  coverageArea: number // Coverage area in square meters
}

export abstract class GrowLight extends ProductionEquipment {
  protected readonly lightStats: GrowLightStats

  constructor(
    type: ItemType,
    category: ItemCategory,
    price: number,
    size: [number, number],
    stats: GrowLightStats
  ) {
    super(type, category, price, size, stats)
    this.lightStats = stats
  }

  public getPowerConsumption(): number {
    return this.lightStats.powerConsumption
  }

  public getLightSpectrum(): number[] {
    return this.lightStats.lightSpectrum
  }

  public getCoverageArea(): number {
    return this.lightStats.coverageArea
  }

  public getEfficiency(): number {
    return this.stats.efficiency
  }
}

export class HalogenGrowLight extends GrowLight {
  constructor() {
    super(
      'halogen_grow_light',
      'lights',
      40,
      [2, 2],
      {
        yieldMultiplier: 1,
        qualityMultiplier: 1,
        timeMultiplier: 1,
        efficiency: 0.6,
        powerConsumption: 100,
        lightSpectrum: [255, 200, 100],
        coverageArea: 1
      }
    )
  }

  public calculateProduction(_inputs: any[]): any {
    // Implementation will be added when we integrate with the grow system
    return null
  }
}

export class LEDGrowLight extends GrowLight {
  constructor() {
    super(
      'led_grow_light',
      'lights',
      80,
      [2, 2],
      {
        yieldMultiplier: 1.2,
        qualityMultiplier: 1.1,
        timeMultiplier: 0.8,
        efficiency: 0.85,
        powerConsumption: 50,
        lightSpectrum: [255, 255, 255],
        coverageArea: 2
      }
    )
  }

  public calculateProduction(_inputs: any[]): any {
    // Implementation will be added when we integrate with the grow system
    return null
  }
}

export class FullSpectrumGrowLight extends GrowLight {
  constructor() {
    super(
      'full_spectrum_grow_light',
      'lights',
      200,
      [2, 2],
      {
        yieldMultiplier: 1.5,
        qualityMultiplier: 1.3,
        timeMultiplier: 0.6,
        efficiency: 0.95,
        powerConsumption: 75,
        lightSpectrum: [255, 255, 255],
        coverageArea: 4
      }
    )
  }

  public calculateProduction(_inputs: any[]): any {
    // Implementation will be added when we integrate with the grow system
    return null
  }
} 