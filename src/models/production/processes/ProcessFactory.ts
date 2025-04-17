import type { ItemType } from '@/types'
import type { ProductionProcess } from '../core/ProductionProcess'
import { GrowTentProcess } from './GrowTentProcess'
import { ChemistryStationProcess } from './ChemistryStationProcess'
import { MixingStationProcess } from './MixingStationProcess'
import { PackagingStationProcess } from './PackagingStationProcess'

export class ProcessFactory {
  private static instance: ProcessFactory
  private processMap: Map<ItemType, ProductionProcess>

  private constructor() {
    this.processMap = new Map()
    this.initializeProcesses()
  }

  public static getInstance(): ProcessFactory {
    if (!ProcessFactory.instance) {
      ProcessFactory.instance = new ProcessFactory()
    }
    return ProcessFactory.instance
  }

  private initializeProcesses(): void {
    // Initialize grow tent process
    this.processMap.set('grow_tent', new GrowTentProcess())

    // Initialize chemistry station process
    this.processMap.set('chemistry_station', new ChemistryStationProcess())

    // Initialize mixing station process
    this.processMap.set('mixing_station', new MixingStationProcess())

    // Initialize packaging station process
    this.processMap.set('packaging_station', new PackagingStationProcess())
  }

  public getProcess(type: ItemType): ProductionProcess | undefined {
    return this.processMap.get(type)
  }

  public getAllProcesses(): ProductionProcess[] {
    return Array.from(this.processMap.values())
  }
} 