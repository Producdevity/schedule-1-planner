import type { ItemType } from '@/types'
import { ProductionProcess, ProcessInput, ProcessOutput } from '../core/ProductionProcess'
import { Quality } from '../core/Quality'
import { Efficiency } from '../core/Efficiency'
import { Resource, ResourceConsumption } from '../core/Resource'

export class GrowingProcess extends ProductionProcess {
  private readonly seedType: ItemType
  private readonly outputType: ItemType
  private readonly qualityMultiplier: number
  private readonly efficiencyMultiplier: number
  private readonly timeMultiplier: number

  constructor(
    seedType: ItemType,
    outputType: ItemType,
    qualityMultiplier: number,
    efficiencyMultiplier: number,
    timeMultiplier: number
  ) {
    super(
      3600, // 1 hour in seconds
      new Quality(0.5),
      new Efficiency(0.7),
      new ResourceConsumption(new Map([
        [Resource.WATER, 1],
        [Resource.POWER, 50],
        [Resource.TIME, 1]
      ]))
    )
    this.seedType = seedType
    this.outputType = outputType
    this.qualityMultiplier = qualityMultiplier
    this.efficiencyMultiplier = efficiencyMultiplier
    this.timeMultiplier = timeMultiplier
  }

  public getInputTypes(): ItemType[] {
    return [this.seedType]
  }

  public getOutputType(): ItemType {
    return this.outputType
  }

  public calculateOutput(inputs: ProcessInput[]): ProcessOutput {
    if (!inputs.every(input => input.type === this.seedType)) {
      throw new Error('Invalid input type for growing process')
    }
    return this.calculateBaseOutput(inputs)
  }

  public getQualityMultiplier(): number {
    return this.qualityMultiplier
  }

  public getEfficiencyMultiplier(): number {
    return this.efficiencyMultiplier
  }

  public getTimeMultiplier(): number {
    return this.timeMultiplier
  }
} 