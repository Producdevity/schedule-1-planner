'use client'

import React, { useState } from 'react'
import type { ItemType } from '../../types'

interface ProductionStep {
  id: string
  station: ItemType
  inputs: Array<{
    type: ItemType
    quantity: number
  }>
  outputs: Array<{
    type: ItemType
    quantity: number
  }>
  processingTime: number // in minutes
  parallelProcessing: boolean // whether multiple items can be processed at once
}

interface ProductionChain {
  id: string
  name: string
  steps: ProductionStep[]
  targetOutput: {
    type: ItemType
    quantity: number
  }
}

interface Infrastructure {
  chains: ProductionChain[]
  equipment: Map<ItemType, number>
  stations: Record<ItemType, number>
  storage: Record<ItemType, number>
}

const DEFAULT_CHAINS: ProductionChain[] = [
  {
    id: 'meth',
    name: 'Meth Production',
    steps: [
      {
        id: 'chemistry',
        station: 'chemistry_station',
        inputs: [
          { type: 'acid', quantity: 1 },
          { type: 'phosphorus', quantity: 1 },
          { type: 'gasoline', quantity: 1 }
        ],
        outputs: [
          { type: 'unprocessed_meth', quantity: 1 }
        ],
        processingTime: 5,
        parallelProcessing: true
      },
      {
        id: 'lab_oven',
        station: 'lab_oven',
        inputs: [
          { type: 'unprocessed_meth', quantity: 1 }
        ],
        outputs: [
          { type: 'meth', quantity: 1 }
        ],
        processingTime: 6,
        parallelProcessing: true
      }
    ],
    targetOutput: {
      type: 'meth',
      quantity: 1
    }
  },
  {
    id: 'cocaine',
    name: 'Cocaine Production',
    steps: [
      {
        id: 'growing',
        station: 'pot',
        inputs: [
          { type: 'coca_seed', quantity: 1 },
          { type: 'soil', quantity: 1 }
        ],
        outputs: [
          { type: 'coca_leaf', quantity: 20 }
        ],
        processingTime: 60,
        parallelProcessing: true
      },
      {
        id: 'drying',
        station: 'drying_rack',
        inputs: [
          { type: 'coca_leaf', quantity: 20 }
        ],
        outputs: [
          { type: 'dried_coca_leaf', quantity: 20 }
        ],
        processingTime: 10,
        parallelProcessing: true
      },
      {
        id: 'cauldron',
        station: 'cauldron',
        inputs: [
          { type: 'dried_coca_leaf', quantity: 20 },
          { type: 'gasoline', quantity: 1 }
        ],
        outputs: [
          { type: 'unprocessed_cocaine', quantity: 10 }
        ],
        processingTime: 5,
        parallelProcessing: true
      },
      {
        id: 'lab_oven',
        station: 'lab_oven',
        inputs: [
          { type: 'unprocessed_cocaine', quantity: 1 }
        ],
        outputs: [
          { type: 'cocaine', quantity: 1 }
        ],
        processingTime: 6,
        parallelProcessing: true
      }
    ],
    targetOutput: {
      type: 'cocaine',
      quantity: 1
    }
  }
]

const ProductionChainPlanner: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<ProductionChain | null>(null)
  const [infrastructure, setInfrastructure] = useState<Infrastructure>({
    chains: [],
    equipment: new Map(),
    stations: {} as Record<ItemType, number>,
    storage: {} as Record<ItemType, number>
  })

  const addChain = (chain: ProductionChain) => {
    setInfrastructure(prev => ({
      ...prev,
      chains: [...prev.chains, { ...chain, targetOutput: { ...chain.targetOutput, quantity: 1 } }]
    }))
  }

  const removeChain = (chainId: string) => {
    setInfrastructure(prev => ({
      ...prev,
      chains: prev.chains.filter(c => c.id !== chainId)
    }))
    if (selectedChain?.id === chainId) {
      setSelectedChain(null)
    }
  }

  const calculateRequiredEquipment = () => {
    const requiredEquipment = new Map<ItemType, number>()
    
    infrastructure.chains.forEach(chain => {
      chain.steps.forEach(step => {
        // Calculate how many items need to be processed per hour to meet target
        const itemsPerHour = (chain.targetOutput.quantity * 60) / step.processingTime
        
        // Calculate required stations based on processing capacity
        const requiredStations = Math.ceil(itemsPerHour / (step.parallelProcessing ? 60 : 1))
        
        // Update equipment count
        const currentCount = requiredEquipment.get(step.station) || 0
        requiredEquipment.set(step.station, Math.max(currentCount, requiredStations))
      })
    })
    
    return requiredEquipment
  }

  const requiredEquipment = calculateRequiredEquipment()

  const handleChainSelect = (chain: ProductionChain) => {
    setSelectedChain(chain)
    const requiredEquipment = calculateRequiredEquipment()
    setInfrastructure(prev => ({
      ...prev,
      equipment: requiredEquipment
    }))
  }

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Available Chains */}
      <div className="w-1/4 p-4 border-r border-gray-200">
        <h2 className="text-lg font-medium mb-4">Available Production Chains</h2>
        <div className="space-y-2">
          {DEFAULT_CHAINS.map(chain => (
            <div
              key={chain.id}
              className="p-2 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => handleChainSelect(chain)}
            >
              <div className="flex justify-between items-center">
                <span>{chain.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addChain(chain)
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Chain Configuration */}
      <div className="flex-1 p-4">
        <h2 className="text-lg font-medium mb-4">Production Chains</h2>
        <div className="space-y-4">
          {infrastructure.chains.map(chain => (
            <div key={chain.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{chain.name}</h3>
                <button
                  onClick={() => removeChain(chain.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-2">
                {chain.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.station.replace(/_/g, ' ')}</div>
                      <div className="text-sm text-gray-500">
                        Inputs: {step.inputs.map(i => `${i.quantity}x ${i.type.replace(/_/g, ' ')}`).join(', ')}
                      </div>
                      <div className="text-sm text-gray-500">
                        Outputs: {step.outputs.map(o => `${o.quantity}x ${o.type.replace(/_/g, ' ')}`).join(', ')}
                      </div>
                      <div className="text-sm text-gray-500">
                        Time: {step.processingTime} minutes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Required Equipment */}
      <div className="w-1/4 p-4 border-l border-gray-200">
        <h2 className="text-lg font-medium mb-4">Required Equipment</h2>
        <div className="space-y-4">
          {Array.from(requiredEquipment.entries()).map(([equipment, count]) => (
            <div key={equipment} className="flex justify-between items-center">
              <span>{equipment.replace(/_/g, ' ')}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductionChainPlanner 