import type { ItemType } from '@/types'
import { ProcessFactory } from '../processes/ProcessFactory'
import { ProductionEquipmentFactory } from '../ProductionEquipmentFactory'
import { Quality } from '../core/Quality'
import type { Resource } from '../core/Resource'

export interface ProductionSetup {
  station: ItemType
  inputs: ItemType[]
  outputs: ItemType[]
}

export interface ProductionStats {
  yield: number
  quality: Quality
  time: number
  efficiency: number
  resourceConsumption: Map<Resource, number>
}

export class ProductionCalculator {
  private processFactory: ProcessFactory
  private equipmentFactory: ProductionEquipmentFactory

  constructor() {
    this.processFactory = ProcessFactory.getInstance()
    this.equipmentFactory = ProductionEquipmentFactory.getInstance()
  }

  public calculateProduction(setup: ProductionSetup): ProductionStats {
    const process = this.processFactory.getProcess(setup.station)
    if (!process) {
      throw new Error('Invalid production station')
    }

    // Calculate base output
    const baseOutput = process.calculateOutput(setup.inputs.map(input => ({
      type: input,
      quantity: 1,
      quality: new Quality(1.0)
    })))

    // Calculate final stats
    return {
      yield: baseOutput.quantity,
      quality: baseOutput.quality,
      time: process.getTimeMultiplier(),
      efficiency: process.getEfficiencyMultiplier(),
      resourceConsumption: process.getResourceConsumption().getConsumptionMap()
    }
  }

  public calculateSetupEfficiency(setup: ProductionSetup): number {
    const stats = this.calculateProduction(setup)
    return stats.efficiency
  }

  public calculateResourceUsage(setup: ProductionSetup): Map<Resource, number> {
    const stats = this.calculateProduction(setup)
    return stats.resourceConsumption
  }
} 