import type { ItemType } from '@/types'
import { ProductionEquipment } from './ProductionEquipment'
import { PlasticPot, MoisturePreservingPot, AirPot } from './Pot'
import { HalogenGrowLight, LEDGrowLight, FullSpectrumGrowLight } from './GrowLight'

export class ProductionEquipmentFactory {
  private static instance: ProductionEquipmentFactory
  private equipmentMap: Map<ItemType, ProductionEquipment>

  private constructor() {
    this.equipmentMap = new Map()
    this.initializeEquipment()
  }

  public static getInstance(): ProductionEquipmentFactory {
    if (!ProductionEquipmentFactory.instance) {
      ProductionEquipmentFactory.instance = new ProductionEquipmentFactory()
    }
    return ProductionEquipmentFactory.instance
  }

  private initializeEquipment(): void {
    // Initialize pots
    this.equipmentMap.set('plastic_pot', new PlasticPot())
    this.equipmentMap.set('moisture_preserving_pot', new MoisturePreservingPot())
    this.equipmentMap.set('air_pot', new AirPot())

    // Initialize lights
    this.equipmentMap.set('halogen_grow_light', new HalogenGrowLight())
    this.equipmentMap.set('led_grow_light', new LEDGrowLight())
    this.equipmentMap.set('full_spectrum_grow_light', new FullSpectrumGrowLight())
  }

  public getEquipment(type: ItemType): ProductionEquipment | undefined {
    return this.equipmentMap.get(type)
  }

  public getAllEquipment(): ProductionEquipment[] {
    return Array.from(this.equipmentMap.values())
  }
} 