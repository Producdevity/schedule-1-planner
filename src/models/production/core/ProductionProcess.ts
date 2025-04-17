import type { ItemType } from '@/types'
import { Quality } from './Quality'
import { Efficiency } from './Efficiency'
import { ResourceConsumption } from './Resource'

export interface ProcessInput {
  type: ItemType
  quantity: number
  quality?: Quality
}

export interface ProcessOutput {
  type: ItemType
  quantity: number
  quality: Quality
}

export abstract class ProductionProcess {
  protected readonly baseTime: number
  protected readonly baseQuality: Quality
  protected readonly baseEfficiency: Efficiency
  protected readonly resourceConsumption: ResourceConsumption

  constructor(
    baseTime: number,
    baseQuality: Quality,
    baseEfficiency: Efficiency,
    resourceConsumption: ResourceConsumption
  ) {
    this.baseTime = baseTime
    this.baseQuality = baseQuality
    this.baseEfficiency = baseEfficiency
    this.resourceConsumption = resourceConsumption
  }

  public abstract getInputTypes(): ItemType[]
  public abstract getOutputType(): ItemType
  public abstract calculateOutput(inputs: ProcessInput[]): ProcessOutput
  public abstract getQualityMultiplier(): number
  public abstract getEfficiencyMultiplier(): number
  public abstract getTimeMultiplier(): number

  protected calculateBaseOutput(inputs: ProcessInput[]): ProcessOutput {
    const totalQuantity = inputs.reduce((sum, input) => sum + input.quantity, 0)
    const averageQuality = this.calculateAverageQuality(inputs)
    
    return {
      type: this.getOutputType(),
      quantity: Math.floor(totalQuantity * this.getEfficiencyMultiplier()),
      quality: averageQuality.multiply(this.getQualityMultiplier())
    }
  }

  private calculateAverageQuality(inputs: ProcessInput[]): Quality {
    const totalQuantity = inputs.reduce((sum, input) => sum + input.quantity, 0)
    const weightedQuality = inputs.reduce((sum, input) => {
      const quality = input.quality ?? this.baseQuality
      return sum + (quality.getValue() * input.quantity)
    }, 0)

    return new Quality(weightedQuality / totalQuantity)
  }

  public getResourceConsumption(): ResourceConsumption {
    return this.resourceConsumption.multiply(this.getTimeMultiplier())
  }
} 