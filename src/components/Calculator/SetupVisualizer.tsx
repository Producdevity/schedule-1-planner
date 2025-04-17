'use client'

import type { ProductionSetup } from '@/models/production/services/ProductionCalculator'
import type { ItemType } from '@/types'
import Image from 'next/image'

interface SetupVisualizerProps {
  setup: ProductionSetup
}

const itemImages: Partial<Record<ItemType, string>> = {
  // Stations
  grow_tent: '/images/stations/grow_tent.png',
  chemistry_station: '/images/stations/chemistry.png',
  mixing_station: '/images/stations/mixing.png',
  packaging_station: '/images/stations/packaging.png',
  brick_press: '/images/stations/brick_press.png',

  // Inputs
  plastic_pot: '/images/pots/plastic.png',
  moisture_preserving_pot: '/images/pots/moisture.png',
  air_pot: '/images/pots/air.png',
  soil: '/images/inputs/soil.png',
  fertilizer: '/images/inputs/fertilizer.png',
  pgr: '/images/inputs/pgr.png',
  speed_grow: '/images/inputs/speed_grow.png',
  acid: '/images/inputs/acid.png',
  phosphorus: '/images/inputs/phosphorus.png',
  gasoline: '/images/inputs/gasoline.png',
  motor_oil: '/images/inputs/motor_oil.png',
  baggie: '/images/inputs/baggie.png',
  jar: '/images/inputs/jar.png',

  // Outputs
  og_kush: '/images/outputs/og_kush.png',
  sour_diesel: '/images/outputs/sour_diesel.png',
  green_crack: '/images/outputs/green_crack.png',
  granddaddy_purple: '/images/outputs/granddaddy_purple.png',
  coca: '/images/outputs/coca.png',
  long_life_soil: '/images/outputs/long_life_soil.png',
  extra_long_life_soil: '/images/outputs/extra_long_life_soil.png',
  brick: '/images/outputs/brick.png'
}

export default function SetupVisualizer({ setup }: SetupVisualizerProps) {
  if (!setup.station) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 italic">
        Select a production station to begin
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg p-4">
      {/* Station Background */}
      <div className="absolute inset-0 bg-gray-200 rounded-lg" />

      {/* Equipment Visualization */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Station */}
        {setup.station && itemImages[setup.station] && (
          <div className="mb-8">
            <Image
              src={itemImages[setup.station]!}
              alt={setup.station}
              width={300}
              height={200}
              className="object-contain"
            />
          </div>
        )}

        {/* Inputs */}
        <div className="flex gap-4 mb-4">
          {setup.inputs.map((input) => (
            itemImages[input] && (
              <div key={input} className="relative">
                <Image
                  src={itemImages[input]!}
                  alt={input}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            )
          ))}
        </div>

        {/* Outputs */}
        <div className="flex gap-4">
          {setup.outputs.map((output) => (
            itemImages[output] && (
              <div key={output} className="relative">
                <Image
                  src={itemImages[output]!}
                  alt={output}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
} 