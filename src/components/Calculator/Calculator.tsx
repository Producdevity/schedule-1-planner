'use client'

import { useState } from 'react'
import { ProductionCalculator } from '@/models/production/services/ProductionCalculator'
import { type ProductionSetup } from '@/models/production/services/ProductionCalculator'
import { type ItemType } from '@/types'
import EquipmentSelector from './Sidebar/EquipmentSelector'
import SetupVisualizer from './SetupVisualizer'
import ResultsPanel from './ResultsPanel'

interface ProductionStation {
  type: ItemType
  inputs: ItemType[]
  outputs: ItemType[]
}

const productionStations: ProductionStation[] = [
  {
    type: 'grow_tent',
    inputs: ['plastic_pot', 'moisture_preserving_pot', 'air_pot'],
    outputs: ['og_kush', 'sour_diesel', 'green_crack', 'granddaddy_purple', 'coca']
  },
  {
    type: 'chemistry_station',
    inputs: ['acid', 'phosphorus', 'gasoline', 'motor_oil'],
    outputs: ['meth', 'cocaine']
  },
  {
    type: 'mixing_station',
    inputs: ['soil', 'fertilizer', 'pgr', 'speed_grow'],
    outputs: ['long_life_soil', 'extra_long_life_soil']
  },
  {
    type: 'packaging_station',
    inputs: ['baggie', 'jar'],
    outputs: ['packaged_weed', 'packaged_cocaine']
  },
  {
    type: 'brick_press',
    inputs: ['soil', 'water'],
    outputs: ['brick']
  }
]

function Calculator() {
  const [selectedStation, setSelectedStation] = useState<ItemType | null>(null)
  const [setup, setSetup] = useState<ProductionSetup>({
    station: 'grow_tent', // Default to a valid station
    inputs: [],
    outputs: []
  })
  const [results, setResults] = useState<{
    output: {
      type: ItemType
      quantity: number
      quality: number
    }
    time: number
  } | null>(null)

  const calculator = new ProductionCalculator()

  const handleStationChange = (station: ItemType) => {
    setSelectedStation(station)
    const stationConfig = productionStations.find(s => s.type === station)
    if (stationConfig) {
      setSetup({
        station,
        inputs: [],
        outputs: []
      })
      setResults(null)
    }
  }

  const handleInputChange = (input: ItemType) => {
    const stationConfig = productionStations.find(s => s.type === selectedStation)
    if (stationConfig && stationConfig.inputs.includes(input)) {
      setSetup(prev => ({
        ...prev,
        inputs: [...prev.inputs, input]
      }))
      calculateProduction()
    }
  }

  const handleOutputChange = (output: ItemType) => {
    const stationConfig = productionStations.find(s => s.type === selectedStation)
    if (stationConfig && stationConfig.outputs.includes(output)) {
      setSetup(prev => ({
        ...prev,
        outputs: [...prev.outputs, output]
      }))
      calculateProduction()
    }
  }

  const calculateProduction = () => {
    if (!setup.station || setup.inputs.length === 0 || setup.outputs.length === 0) {
      return
    }

    try {
      const newResults = calculator.calculateProduction(setup)
      setResults({
        output: {
          type: setup.outputs[0],
          quantity: newResults.yield,
          quality: newResults.quality.getValue()
        },
        time: newResults.time
      })
    } catch (error) {
      console.error('Error calculating production:', error)
      setResults(null)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Production Calculator</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 overflow-y-auto border-r border-gray-200 bg-white p-4">
          <EquipmentSelector
            stations={productionStations}
            selectedStation={selectedStation}
            onStationChange={handleStationChange}
            onInputChange={handleInputChange}
            onOutputChange={handleOutputChange}
            setup={setup}
          />
        </div>

        {/* Main Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Setup Visualization */}
          <div className="flex-1 overflow-auto p-6">
            <SetupVisualizer setup={setup} />
          </div>

          {/* Results Panel */}
          <div className="h-64 border-t border-gray-200 bg-white p-4">
            <ResultsPanel results={results} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
