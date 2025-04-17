import type { ItemType } from '@/types'
import ProductionBase from './ProductionBase'

class GrowTent extends ProductionBase {
  public readonly type = 'grow_tent'
  public readonly itemCategory = 'agriculture'
  public readonly price = 100
  public readonly allowedInputs: ItemType[][] = [
    ['soil', 'long_life_soil', 'extra_long_life_soil'],
    ['og_kush_seed', 'sour_diesel_seed', 'green_crack_seed', 'granddaddy_purple_seed', 'coca_seed'],
  ]

  public readonly allowedOutputs = []
}

export default GrowTent
