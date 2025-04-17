import type { ItemType } from '@/types'
import { ProductionProcess } from '../core/ProductionProcess'
import { Quality } from '../core/Quality'
import { Efficiency } from '../core/Efficiency'
import { ResourceConsumption } from '../core/Resource'
import { Resource } from '../core/Resource'
import type { ProcessInput, ProcessOutput } from '../core/ProductionProcess'

export class PackagingStationProcess extends ProductionProcess {
  constructor() {
    super(
      300, // 5 minutes base time
      new Quality(1.0),
      new Efficiency(1.0),
      new ResourceConsumption(new Map([
        [Resource.POWER, 100],
        [Resource.TIME, 300]
      ]))
    )
  }

  public getInputTypes(): ItemType[] {
    return [
      'og_kush',
      'sour_diesel',
      'green_crack',
      'granddaddy_purple',
      'meth',
      'heroin',
      'cocaine',
      'baggie'
    ]
  }

  public getOutputType(): ItemType {
    return 'packaged_weed' // Default output, will be overridden based on input
  }

  public calculateOutput(inputs: ProcessInput[]): ProcessOutput {
    const baseOutput = this.calculateBaseOutput(inputs)
    let outputType: ItemType = 'packaged_weed'

    // Determine output type based on input
    if (inputs.some(input => 
      input.type === 'og_kush' || 
      input.type === 'sour_diesel' || 
      input.type === 'green_crack' || 
      input.type === 'granddaddy_purple'
    )) {
      outputType = 'packaged_weed'
    } else if (inputs.some(input => input.type === 'meth')) {
      outputType = 'brick'
    } else if (inputs.some(input => input.type === 'cocaine')) {
      outputType = 'packaged_cocaine'
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