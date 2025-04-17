'use client'

import { useState } from 'react'
import { type ProductionSetup } from '@/models/production/services/ProductionCalculator'
import { type ItemType } from '@/types'

interface ProductionStation {
  type: ItemType
  inputs: ItemType[]
  outputs: ItemType[]
}

interface EquipmentSelectorProps {
  stations: ProductionStation[]
  selectedStation: ItemType | null
  onStationChange: (station: ItemType) => void
  onInputChange: (input: ItemType) => void
  onOutputChange: (output: ItemType) => void
  setup: ProductionSetup
}

// Helper function to group items by category
function groupItemsByCategory(items: ItemType[]) {
  const groups: Record<string, ItemType[]> = {
    'Seeds': items.filter(item => item.includes('seed')),
    'Pots': items.filter(item => item.includes('pot')),
    'Lights': items.filter(item => item.includes('light')),
    'Fertilizers': items.filter(item => item.includes('fertilizer')),
    'Other': items.filter(item => 
      !item.includes('seed') && 
      !item.includes('pot') && 
      !item.includes('light') && 
      !item.includes('fertilizer')
    )
  }
  return groups
}

export default function EquipmentSelector({
  stations,
  selectedStation,
  onStationChange,
  onInputChange,
  onOutputChange,
  setup
}: EquipmentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter stations based on search query
  const filteredStations = stations.filter(station => 
    station.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get current station's inputs and outputs
  const currentStation = stations.find(s => s.type === selectedStation)
  const inputGroups = currentStation ? groupItemsByCategory(currentStation.inputs) : {}
  const outputGroups = currentStation ? groupItemsByCategory(currentStation.outputs) : {}

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Station Selection */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">Production Station</h2>
        <div className="space-y-2">
          {filteredStations.map((station) => (
            <button
              key={station.type}
              onClick={() => onStationChange(station.type)}
              className={`w-full px-4 py-2 text-left rounded-md transition-colors flex items-center ${
                selectedStation === station.type
                  ? 'bg-blue-100 text-blue-900'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="flex-1">{station.type.replace(/_/g, ' ')}</span>
              {selectedStation === station.type && (
                <span className="ml-2 text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Input Selection */}
      {selectedStation && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">Inputs</h2>
          {Object.entries(inputGroups).map(([category, items]) => (
            items.length > 0 && (
              <div key={category} className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
                <div className="space-y-2">
                  {items.map((input) => (
                    <button
                      key={input}
                      onClick={() => onInputChange(input)}
                      className={`w-full px-4 py-2 text-left rounded-md transition-colors flex items-center ${
                        setup.inputs.includes(input)
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex-1">{input.replace(/_/g, ' ')}</span>
                      {setup.inputs.includes(input) && (
                        <span className="ml-2 text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Output Selection */}
      {selectedStation && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">Outputs</h2>
          {Object.entries(outputGroups).map(([category, items]) => (
            items.length > 0 && (
              <div key={category} className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
                <div className="space-y-2">
                  {items.map((output) => (
                    <button
                      key={output}
                      onClick={() => onOutputChange(output)}
                      className={`w-full px-4 py-2 text-left rounded-md transition-colors flex items-center ${
                        setup.outputs.includes(output)
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex-1">{output.replace(/_/g, ' ')}</span>
                      {setup.outputs.includes(output) && (
                        <span className="ml-2 text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
} 