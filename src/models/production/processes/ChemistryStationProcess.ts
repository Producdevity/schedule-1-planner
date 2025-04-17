import type { ItemType } from '@/types'
import { ProductionProcess } from '../core/ProductionProcess'
import { Quality } from '../core/Quality'
import { Efficiency } from '../core/Efficiency'
import { ResourceConsumption } from '../core/Resource'
import { Resource } from '../core/Resource'
import type { ProcessInput, ProcessOutput } from '../core/ProductionProcess'

export class ChemistryStationProcess extends ProductionProcess {
  constructor() {
    super(
      1800, // 30 minutes base time
      new Quality(1.0),
      new Efficiency(1.0),
      new ResourceConsumption(new Map([
        [Resource.WATER, 5],
        [Resource.POWER, 200],
        [Resource.TIME, 1800]
      ]))
    )
  }

  public getInputTypes(): ItemType[] {
    return [
      'acid',
      'phosphorus',
      'gasoline',
      'motor_oil',
      'coca'
    ]
  }

  public getOutputType(): ItemType {
    return 'meth' // Default output, will be overridden based on input chemicals
  }

  public calculateOutput(inputs: ProcessInput[]): ProcessOutput {
    const baseOutput = this.calculateBaseOutput(inputs)
    let outputType: ItemType = 'meth'

    // Determine output type based on input chemicals
    if (inputs.some(input => input.type === 'acid')) {
      outputType = 'meth'
    } else if (inputs.some(input => input.type === 'coca')) {
      outputType = 'cocaine'
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