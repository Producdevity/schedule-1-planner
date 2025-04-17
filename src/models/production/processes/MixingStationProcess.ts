import type { ItemType } from '@/types'
import { ProductionProcess } from '../core/ProductionProcess'
import { Quality } from '../core/Quality'
import { Efficiency } from '../core/Efficiency'
import { ResourceConsumption } from '../core/Resource'
import { Resource } from '../core/Resource'
import type { ProcessInput, ProcessOutput } from '../core/ProductionProcess'

export class MixingStationProcess extends ProductionProcess {
  constructor() {
    super(
      900, // 15 minutes base time
      new Quality(1.0),
      new Efficiency(1.0),
      new ResourceConsumption(new Map([
        [Resource.WATER, 2],
        [Resource.POWER, 50],
        [Resource.TIME, 900]
      ]))
    )
  }

  public getInputTypes(): ItemType[] {
    return [
      'soil',
      'fertilizer',
      'pgr',
      'speed_grow'
    ]
  }

  public getOutputType(): ItemType {
    return 'long_life_soil' // Default output, will be overridden based on input
  }

  public calculateOutput(inputs: ProcessInput[]): ProcessOutput {
    const baseOutput = this.calculateBaseOutput(inputs)
    let outputType: ItemType = 'long_life_soil'

    // Determine output type based on input
    if (inputs.some(input => input.type === 'fertilizer')) {
      outputType = 'long_life_soil'
    } else if (inputs.some(input => input.type === 'pgr')) {
      outputType = 'extra_long_life_soil'
    }

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