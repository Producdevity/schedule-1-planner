import type { ItemType } from '@/types'
import { ProductionProcess } from '../core/ProductionProcess'
import { Quality } from '../core/Quality'
import { Efficiency } from '../core/Efficiency'
import { ResourceConsumption } from '../core/Resource'
import { Resource } from '../core/Resource'
import type { ProcessInput, ProcessOutput } from '../core/ProductionProcess'

export class GrowTentProcess extends ProductionProcess {
  constructor() {
    super(
      3600, // 1 hour base time
      new Quality(1.0),
      new Efficiency(1.0),
      new ResourceConsumption(new Map([
        [Resource.WATER, 10],
        [Resource.POWER, 100],
        [Resource.TIME, 3600]
      ]))
    )
  }

  public getInputTypes(): ItemType[] {
    return [
      'plastic_pot',
      'moisture_preserving_pot',
      'air_pot',
      'soil',
      'long_life_soil',
      'extra_long_life_soil',
      'og_kush_seed',
      'sour_diesel_seed',
      'green_crack_seed',
      'granddaddy_purple_seed',
      'coca_seed',
      'fertilizer',
      'pgr',
      'speed_grow'
    ]
  }

  public getOutputType(): ItemType {
    return 'og_kush' // Default output, will be overridden based on input seed
  }

  public calculateOutput(inputs: ProcessInput[]): ProcessOutput {
    const seed = inputs.find(input => input.type.endsWith('_seed'))
    if (!seed) {
      throw new Error('No seed provided for growing process')
    }

    const outputType = seed.type.replace('_seed', '') as ItemType
    const baseOutput = this.calculateBaseOutput(inputs)

    return {
      type: outputType,
      quantity: baseOutput.quantity,
      quality: baseOutput.quality
    }
  }

  public getQualityMultiplier(): number {
    return 1.0
  }

  public getEfficiencyMultiplier(): number {
    return 1.0
  }

  public getTimeMultiplier(): number {
    return 1.0
  }
} 