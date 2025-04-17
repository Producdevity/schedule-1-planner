'use client'

import React, { useState } from 'react'
import type { ItemType } from '@/types'
import Image from 'next/image'

interface ProductionStep {
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
  parallelProcessing: boolean
}

interface ProductionChain {
  name: string
  steps: ProductionStep[]
  targetOutput: ItemType
}

interface StationEfficiency {
  station: ItemType
  required: number
  actual: number
  utilization: number // percentage
  underutilized: boolean
  timeWasted: number // in minutes per day
}

const PRODUCTION_CHAINS: Record<string, ProductionChain> = {
  meth: {
    name: 'Meth Production',
    steps: [
      {
        station: 'chemistry_station',
        inputs: [
          { type: 'acid', quantity: 1 },
          { type: 'phosphorus', quantity: 1 },
          { type: 'gasoline', quantity: 1 },
        ],
        outputs: [{ type: 'unprocessed_meth', quantity: 1 }],
        processingTime: 5,
        parallelProcessing: true,
      },
      {
        station: 'lab_oven',
        inputs: [{ type: 'unprocessed_meth', quantity: 1 }],
        outputs: [{ type: 'meth', quantity: 1 }],
        processingTime: 6,
        parallelProcessing: true,
      },
    ],
    targetOutput: 'meth',
  },
  cocaine: {
    name: 'Cocaine Production',
    steps: [
      {
        station: 'grow_tent',
        inputs: [
          { type: 'coca_seed', quantity: 1 },
          { type: 'soil', quantity: 1 },
        ],
        outputs: [{ type: 'coca_leaf', quantity: 20 }],
        processingTime: 60,
        parallelProcessing: true,
      },
      {
        station: 'drying_rack',
        inputs: [{ type: 'coca_leaf', quantity: 20 }],
        outputs: [{ type: 'dried_coca_leaf', quantity: 20 }],
        processingTime: 10,
        parallelProcessing: true,
      },
      {
        station: 'cauldron',
        inputs: [
          { type: 'dried_coca_leaf', quantity: 20 },
          { type: 'gasoline', quantity: 1 },
        ],
        outputs: [{ type: 'unprocessed_cocaine', quantity: 10 }],
        processingTime: 5,
        parallelProcessing: true,
      },
      {
        station: 'lab_oven',
        inputs: [{ type: 'unprocessed_cocaine', quantity: 1 }],
        outputs: [{ type: 'cocaine', quantity: 1 }],
        processingTime: 6,
        parallelProcessing: true,
      },
    ],
    targetOutput: 'cocaine',
  },
  weed: {
    name: 'Weed Production',
    steps: [
      {
        station: 'grow_tent',
        inputs: [
          { type: 'og_kush_seed', quantity: 1 },
          { type: 'soil', quantity: 1 },
        ],
        outputs: [{ type: 'og_kush', quantity: 1 }],
        processingTime: 120,
        parallelProcessing: true,
      },
      {
        station: 'packaging_station',
        inputs: [
          { type: 'og_kush', quantity: 1 },
          { type: 'baggie', quantity: 1 },
        ],
        outputs: [{ type: 'packaged_weed', quantity: 1 }],
        processingTime: 5,
        parallelProcessing: true,
      },
    ],
    targetOutput: 'packaged_weed',
  },
}

type ProductionChainType = keyof typeof PRODUCTION_CHAINS

function SimpleCalculator() {
  const [selectedChain, setSelectedChain] = useState<ProductionChainType>('meth')
  const [targetOutput, setTargetOutput] = useState<number>(50)
  const [customStationCounts, setCustomStationCounts] = useState<Record<ItemType, number>>({} as Record<ItemType, number>)
  const [calculatedRequirements, setCalculatedRequirements] = useState<{
    stations: Record<ItemType, number>
    inputs: Record<ItemType, number>
    efficiencies: StationEfficiency[]
    actualOutput: number
  }>({
    stations: {} as Record<ItemType, number>,
    inputs: {} as Record<ItemType, number>,
    efficiencies: [],
    actualOutput: 0,
  })

  const calculateRequirements = () => {
    const stations: Record<ItemType, number> = {} as Record<ItemType, number>
    const inputs: Record<ItemType, number> = {} as Record<ItemType, number>
    const efficiencies: StationEfficiency[] = []
    const currentChain = PRODUCTION_CHAINS[selectedChain]

    // Calculate backwards from target output
    let currentOutput = targetOutput
    const reversedSteps = [...currentChain.steps].reverse()

    // First pass: calculate required stations and inputs
    reversedSteps.forEach((step: ProductionStep) => {
      // Calculate how many items need to be processed per hour
      const itemsPerHour = (currentOutput * 60) / step.processingTime

      // Calculate required stations based on processing capacity
      const requiredStations = Math.ceil(itemsPerHour / (step.parallelProcessing ? 60 : 1))
      stations[step.station] = requiredStations

      // Calculate required inputs for this step
      step.inputs.forEach((input: { type: ItemType; quantity: number }) => {
        const inputQuantity = Math.ceil((currentOutput * input.quantity) / step.outputs[0].quantity)
        inputs[input.type] = (inputs[input.type] || 0) + inputQuantity
      })

      // Update current output for next step
      const inputQuantity = Math.ceil((currentOutput * step.inputs[0].quantity) / step.outputs[0].quantity)
      currentOutput = inputQuantity
    })

    // Second pass: calculate actual output and efficiency based on custom station counts
    let actualOutput = targetOutput
    currentChain.steps.forEach((step: ProductionStep) => {
      const customCount = customStationCounts[step.station] || stations[step.station]
      const maxItemsPerHour = customCount * (step.parallelProcessing ? 60 : 1)
      const maxOutputPerHour = (maxItemsPerHour * step.outputs[0].quantity) / step.inputs[0].quantity
      const maxOutputPerDay = maxOutputPerHour * 24

      // Calculate efficiency metrics
      const itemsPerHour = (actualOutput * 60) / step.processingTime
      const utilization = (itemsPerHour / maxItemsPerHour) * 100
      const timeWasted = (1 - utilization / 100) * 24 * 60 // minutes per day
      
      efficiencies.push({
        station: step.station,
        required: stations[step.station],
        actual: customCount,
        utilization: Math.min(100, utilization),
        underutilized: utilization < 90,
        timeWasted: timeWasted,
      })

      // Update actual output based on station capacity
      actualOutput = Math.min(actualOutput, maxOutputPerDay)
    })

    setCalculatedRequirements({ stations, inputs, efficiencies, actualOutput })
  }

  const handleStationCountChange = (station: ItemType, count: number) => {
    setCustomStationCounts(prev => ({
      ...prev,
      [station]: Math.max(1, count)
    }))
  }

  React.useEffect(() => {
    calculateRequirements()
  }, [targetOutput, selectedChain, customStationCounts])

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Production Calculator</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Overview */}
          <div className="space-y-8">
            {/* Chain Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Select Production Chain
              </label>
              <div className="flex space-x-4">
                {Object.entries(PRODUCTION_CHAINS).map(([key, chain]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedChain(key as ProductionChainType)}
                    className={`rounded-md px-4 py-2 ${
                      selectedChain === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {chain.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Output */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Target Output (per day)
              </label>
              <input
                type="number"
                value={targetOutput}
                onChange={(e) => setTargetOutput(Number(e.target.value))}
                className="w-32 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
                min="1"
              />
            </div>

            {/* Production Chain Visualization */}
            <div className="space-y-12">
              {PRODUCTION_CHAINS[selectedChain].steps.map((step, index) => (
                <div key={step.station} className="flex items-center space-x-8">
                  {/* Station */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-32 w-32 rounded-lg bg-gray-800 p-4">
                      <Image
                        src={`/images/stations/${step.station}.png`}
                        alt={step.station}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-lg font-medium">{step.station.replace(/_/g, ' ')}</div>
                      <div className="text-sm text-gray-400">
                        Required: {calculatedRequirements.stations[step.station] || 0}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < PRODUCTION_CHAINS[selectedChain].steps.length - 1 && (
                    <div className="relative h-0.5 flex-1 bg-gray-600">
                      <svg
                        className="absolute top-1/2 -right-5 h-4 w-4 -translate-y-1/2 transform text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Inputs */}
                  <div className="flex space-x-6">
                    {step.inputs.map((input) => (
                      <div key={input.type} className="flex flex-col items-center">
                        <div className="relative h-24 w-24 rounded-lg bg-gray-800 p-4">
                          <Image
                            src={`/images/inputs/${input.type}.png`}
                            alt={input.type}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <div className="text-sm">{input.type.replace(/_/g, ' ')}</div>
                          <div className="text-sm text-gray-400">
                            {calculatedRequirements.inputs[input.type] || 0} per day
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Efficiency Analysis and Summary */}
          <div className="space-y-8">
            {/* Output Summary */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-medium">Production Summary</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="mb-2 font-medium">Target Output</h4>
                  <div className="text-2xl font-bold">{targetOutput} per day</div>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Actual Output</h4>
                  <div className={`text-2xl font-bold ${
                    calculatedRequirements.actualOutput < targetOutput ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {calculatedRequirements.actualOutput.toFixed(1)} per day
                  </div>
                  {calculatedRequirements.actualOutput < targetOutput && (
                    <div className="mt-2 text-sm text-yellow-400">
                      ⚠️ Current station configuration cannot meet target output
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Efficiency Analysis */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-6 text-xl font-medium">Efficiency Analysis</h3>
              <div className="space-y-4">
                {calculatedRequirements.efficiencies.map((efficiency) => (
                  <div key={efficiency.station} className="rounded-lg bg-gray-700 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium">{efficiency.station.replace(/_/g, ' ')}</h4>
                        <div className="text-sm text-gray-400">
                          Required: {efficiency.required.toFixed(2)} | Actual: {efficiency.actual}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleStationCountChange(efficiency.station, efficiency.actual - 1)}
                            className="rounded-md bg-gray-600 px-2 py-1 hover:bg-gray-500"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={efficiency.actual}
                            onChange={(e) => handleStationCountChange(efficiency.station, parseInt(e.target.value) || 1)}
                            className="w-16 rounded-md border border-gray-600 bg-gray-700 px-2 py-1 text-center"
                            min="1"
                          />
                          <button
                            onClick={() => handleStationCountChange(efficiency.station, efficiency.actual + 1)}
                            className="rounded-md bg-gray-600 px-2 py-1 hover:bg-gray-500"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium">
                            {efficiency.utilization.toFixed(1)}% Utilization
                          </div>
                          <div className="text-sm text-gray-400">
                            {efficiency.timeWasted.toFixed(0)} min wasted per day
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-600">
                      <div
                        className={`h-full rounded-full ${
                          efficiency.underutilized ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${efficiency.utilization}%` }}
                      />
                    </div>
                    {efficiency.underutilized && (
                      <div className="mt-2 text-sm text-yellow-400">
                        ⚠️ This station is underutilized. Consider reducing the number of stations to improve efficiency.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-6 text-xl font-medium">Summary</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="mb-4 font-medium">Required Stations</h4>
                  <ul className="space-y-3">
                    {Object.entries(calculatedRequirements.stations).map(([station, count]) => (
                      <li key={station} className="flex items-center justify-between">
                        <span className="text-gray-300">{station.replace(/_/g, ' ')}</span>
                        <span className="text-lg font-medium">{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 font-medium">Required Inputs (per day)</h4>
                  <ul className="space-y-3">
                    {Object.entries(calculatedRequirements.inputs).map(([input, quantity]) => (
                      <li key={input} className="flex items-center justify-between">
                        <span className="text-gray-300">{input.replace(/_/g, ' ')}</span>
                        <span className="text-lg font-medium">{quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleCalculator
