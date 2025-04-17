'use client'

import { useState } from 'react'
import { type ProductionSetup, type ProductionStats } from '@/models/production/services/ProductionCalculator'
import { type ItemType } from '@/types'
import EquipmentSelector from './Sidebar/EquipmentSelector'
import { ProductionCalculator } from '@/models/production/services/ProductionCalculator'

interface ProductionLine {
  id: string
  setup: ProductionSetup
  stats: ProductionStats
}

export default function ProductionInfrastructure() {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>([])
  const [selectedLine, setSelectedLine] = useState<string | null>(null)
  const calculator = new ProductionCalculator()

  const stations: Array<{
    type: ItemType
    inputs: ItemType[]
    outputs: ItemType[]
  }> = [
    {
      type: 'grow_tent',
      inputs: ['soil', 'og_kush_seed', 'fertilizer'],
      outputs: ['og_kush']
    },
    {
      type: 'chemistry_station',
      inputs: ['acid', 'phosphorus', 'gasoline'],
      outputs: ['meth']
    },
    {
      type: 'packaging_station',
      inputs: ['og_kush', 'baggie'],
      outputs: ['packaged_weed']
    }
  ]

  const addProductionLine = () => {
    const newLine: ProductionLine = {
      id: Date.now().toString(),
      setup: {
        station: 'grow_tent',
        inputs: [],
        outputs: []
      },
      stats: calculator.calculateProduction({
        station: 'grow_tent',
        inputs: [],
        outputs: []
      })
    }
    setProductionLines([...productionLines, newLine])
    setSelectedLine(newLine.id)
  }

  const removeProductionLine = (id: string) => {
    setProductionLines(productionLines.filter(line => line.id !== id))
    if (selectedLine === id) {
      setSelectedLine(productionLines.length > 1 ? productionLines[0].id : null)
    }
  }

  const updateProductionLine = (id: string, setup: ProductionSetup) => {
    const stats = calculator.calculateProduction(setup)
    setProductionLines(productionLines.map(line => 
      line.id === id 
        ? { ...line, setup, stats } 
        : line
    ))
  }

  const calculateTotalStats = () => {
    if (productionLines.length === 0) return null
    const firstLine = productionLines[0]
    return productionLines.reduce((acc, line) => ({
      yield: acc.yield + line.stats.yield,
      quality: acc.quality.add(line.stats.quality),
      time: Math.max(acc.time, line.stats.time),
      efficiency: (acc.efficiency + line.stats.efficiency) / productionLines.length,
      resourceConsumption: Array.from(line.stats.resourceConsumption.entries()).reduce(
        (map, [resource, amount]) => {
          map.set(resource, (map.get(resource) || 0) + amount)
          return map
        },
        new Map(acc.resourceConsumption)
      )
    }), {
      yield: 0,
      quality: firstLine.stats.quality,
      time: 0,
      efficiency: 0,
      resourceConsumption: new Map()
    })
  }

  const totalStats = calculateTotalStats()
  const currentLine = selectedLine ? productionLines.find(l => l.id === selectedLine) : null

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 border-r border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Production Lines</h2>
          <button
            onClick={addProductionLine}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Line
          </button>
        </div>
        
        <div className="space-y-2">
          {productionLines.map(line => (
            <div
              key={line.id}
              className={`p-2 rounded cursor-pointer ${
                selectedLine === line.id
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedLine(line.id)}
            >
              <div className="flex justify-between items-center">
                <span>{line.setup.station.replace(/_/g, ' ')}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeProductionLine(line.id)
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {currentLine ? (
          <div className="space-y-6">
            <EquipmentSelector
              stations={stations}
              selectedStation={currentLine.setup.station}
              onStationChange={(station) => {
                updateProductionLine(selectedLine!, {
                  ...currentLine.setup,
                  station,
                  inputs: [],
                  outputs: []
                })
              }}
              onInputChange={(input) => {
                const inputs = currentLine.setup.inputs.includes(input)
                  ? currentLine.setup.inputs.filter(i => i !== input)
                  : [...currentLine.setup.inputs, input]
                updateProductionLine(selectedLine!, { ...currentLine.setup, inputs })
              }}
              onOutputChange={(output) => {
                const outputs = currentLine.setup.outputs.includes(output)
                  ? currentLine.setup.outputs.filter(o => o !== output)
                  : [...currentLine.setup.outputs, output]
                updateProductionLine(selectedLine!, { ...currentLine.setup, outputs })
              }}
              setup={currentLine.setup}
            />

            {/* Line Statistics */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Line Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Yield</p>
                  <p className="text-xl font-medium">{currentLine.stats.yield.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quality</p>
                  <p className="text-xl font-medium">{currentLine.stats.quality.getValue().toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-xl font-medium">{currentLine.stats.time.toFixed(2)}s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Efficiency</p>
                  <p className="text-xl font-medium">{(currentLine.stats.efficiency * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select or create a production line to get started
          </div>
        )}
      </div>

      {/* Right Sidebar - Total Statistics */}
      <div className="w-1/4 p-4 border-l border-gray-200">
        <h2 className="text-lg font-medium mb-4">Total Statistics</h2>
        {totalStats ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Yield</p>
              <p className="text-xl font-medium">{totalStats.yield.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Quality</p>
              <p className="text-xl font-medium">{totalStats.quality.getValue().toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Time</p>
              <p className="text-xl font-medium">{totalStats.time.toFixed(2)}s</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Efficiency</p>
              <p className="text-xl font-medium">{(totalStats.efficiency * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Resource Consumption</p>
              {Array.from(totalStats.resourceConsumption.entries()).map(([resource, amount]) => (
                <div key={resource} className="flex justify-between">
                  <span className="text-sm">{resource}</span>
                  <span className="text-sm font-medium">{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">No production lines</div>
        )}
      </div>
    </div>
  )
} 