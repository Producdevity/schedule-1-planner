import type { ItemType, ProductionInput, ProductionOutput, FertilizerEffect } from '@/types'
import ProductionBase from './ProductionBase'

class GrowTent extends ProductionBase {
  public readonly type = 'grow_tent'
  public readonly itemCategory = 'agriculture'
  public readonly price = 100
  public readonly allowedInputs: ItemType[][] = [
    ['soil', 'long_life_soil', 'extra_long_life_soil'],
    ['og_kush_seed', 'sour_diesel_seed', 'green_crack_seed', 'granddaddy_purple_seed', 'coca_seed'],
    ['fertilizer', 'pgr', 'speed_grow']
  ]

  private readonly baseProductionTime = 3600 // 1 hour in seconds
  private readonly baseYield = 1
  private readonly baseQuality = 1

  private readonly fertilizerEffects: Partial<Record<ItemType, FertilizerEffect>> = {
    fertilizer: {
      yieldMultiplier: 1,
      qualityMultiplier: 1.5,
      timeMultiplier: 1
    },
    pgr: {
      yieldMultiplier: 2,
      qualityMultiplier: 0.5,
      timeMultiplier: 1
    },
    speed_grow: {
      yieldMultiplier: 1,
      qualityMultiplier: 0.8,
      timeMultiplier: 0.5
    }
  }

  private readonly soilUses: Partial<Record<ItemType, number>> = {
    soil: 1,
    long_life_soil: 2,
    extra_long_life_soil: 3
  }

  public calculateProduction(inputs: ProductionInput[]): ProductionOutput | null {
    // Validate inputs
    if (inputs.length < 2) return null // Need at least soil and seed

    const soil = inputs.find(input => 
      ['soil', 'long_life_soil', 'extra_long_life_soil'].includes(input.type)
    )
    const seed = inputs.find(input => 
      ['og_kush_seed', 'sour_diesel_seed', 'green_crack_seed', 'granddaddy_purple_seed', 'coca_seed'].includes(input.type)
    )
    const fertilizers = inputs.filter(input => 
      ['fertilizer', 'pgr', 'speed_grow'].includes(input.type)
    )

    if (!soil || !seed || soil.quantity < 1 || seed.quantity < 1) return null

    // Calculate combined fertilizer effects
    const combinedEffects: FertilizerEffect = fertilizers.reduce(
      (acc, fertilizer) => {
        const effect = this.fertilizerEffects[fertilizer.type]
        if (!effect) return acc
        return {
          yieldMultiplier: acc.yieldMultiplier * effect.yieldMultiplier,
          qualityMultiplier: acc.qualityMultiplier * effect.qualityMultiplier,
          timeMultiplier: acc.timeMultiplier * effect.timeMultiplier
        }
      },
      { yieldMultiplier: 1, qualityMultiplier: 1, timeMultiplier: 1 }
    )

    // Calculate output
    const outputType = this.getOutputType(seed.type)
    const quantity = Math.floor(this.baseYield * combinedEffects.yieldMultiplier)
    const quality = Math.min(1, this.baseQuality * combinedEffects.qualityMultiplier)

    return {
      type: outputType,
      quantity,
      quality
    }
  }

  private getOutputType(seedType: ItemType): ItemType {
    // Map seed types to their output types
    const seedToOutput: Partial<Record<ItemType, ItemType>> = {
      og_kush_seed: 'og_kush',
      sour_diesel_seed: 'sour_diesel',
      green_crack_seed: 'green_crack',
      granddaddy_purple_seed: 'granddaddy_purple',
      coca_seed: 'coca'
    }
    const output = seedToOutput[seedType]
    if (!output) throw new Error(`No output type defined for seed type: ${seedType}`)
    return output
  }
}

export default GrowTent
