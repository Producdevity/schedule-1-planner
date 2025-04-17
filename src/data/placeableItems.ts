import { type Item } from '@/types'

interface PlaceableItem extends Item {
  size: [number, number]
}

const placeableItems: PlaceableItem[] = [
  { type: 'bed', category: 'furniture', price: 150, size: [3, 5] },
  { type: 'coffee_table', category: 'furniture', price: 120, size: [2, 4] },
  { type: 'wooden_square_table', category: 'furniture', price: 50, size: [2, 2] },
  { type: 'metal_square_table', category: 'furniture', price: 60, size: [2, 2] },
  { type: 'floor_lamp', category: 'furniture', price: 25, size: [1, 1] },
  { type: 'tv', category: 'furniture', price: 300, size: [4, 2] },
  { type: 'small_storage_rack', category: 'storage', price: 30, size: [2, 1] },
  { type: 'medium_storage_rack', category: 'storage', price: 45, size: [3, 1] },
  { type: 'large_storage_rack', category: 'storage', price: 60, size: [4, 1] },
  { type: 'display_cabinet', category: 'storage', price: 250, size: [3, 2] },
  { type: 'trash_can', category: 'furniture', price: 25, size: [2, 2] },
  { type: 'grow_tent', category: 'agriculture', price: 100, size: [2, 2] },
  { type: 'pot_sprinkler', category: 'agriculture_tool', price: 200, size: [2, 1] },
  { type: 'soil_pourer', category: 'agriculture_tool', price: 300, size: [2, 1] },
  { type: 'suspension_rack', category: 'furniture', price: 40, size: [2, 2] },
  { type: 'plastic_pot', category: 'agriculture', price: 20, size: [2, 2] },
  { type: 'moisture_preserving_pot', category: 'agriculture', price: 50, size: [2, 2] },
  { type: 'air_pot', category: 'agriculture', price: 120, size: [2, 2] },
  { type: 'halogen_grow_light', category: 'lights', price: 40, size: [2, 2] },
  { type: 'led_grow_light', category: 'lights', price: 80, size: [2, 2] },
  { type: 'full_spectrum_grow_light', category: 'lights', price: 200, size: [2, 2] },
  { type: 'mixing_station', category: 'furniture', price: 500, size: [4, 2] },
  { type: 'mixing_station_mk2', category: 'furniture', price: 2000, size: [4, 2] },
  { type: 'packaging_station', category: 'furniture', price: 100, size: [4, 2] },
  { type: 'packaging_station_mk2', category: 'furniture', price: 750, size: [4, 2] },
  { type: 'chemistry_station', category: 'furniture', price: 1000, size: [4, 2] },
  { type: 'lab_oven', category: 'furniture', price: 1000, size: [4, 2] },
  { type: 'drying_rack', category: 'furniture', price: 250, size: [3, 2] },
  { type: 'brick_press', category: 'furniture', price: 800, size: [2, 2] },
  { type: 'cauldron', category: 'none', price: 3000, size: [4, 4] },
]

export default placeableItems
