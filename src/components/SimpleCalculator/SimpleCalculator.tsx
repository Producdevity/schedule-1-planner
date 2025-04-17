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
  const [calculatedRequirements, setCalculatedRequirements] = useState<{
    stations: Record<ItemType, number>
    inputs: Record<ItemType, number>
  }>({
    stations: {} as Record<ItemType, number>,
    inputs: {} as Record<ItemType, number>,
  })

  const calculateRequirements = () => {
    const stations: Record<ItemType, number> = {} as Record<ItemType, number>
    const inputs: Record<ItemType, number> = {} as Record<ItemType, number>
    const currentChain = PRODUCTION_CHAINS[selectedChain]

    // Calculate backwards from target output
    let currentOutput = targetOutput
    const reversedSteps = [...currentChain.steps].reverse()

    reversedSteps.forEach((step: ProductionStep) => {
      // Calculate how many items need to be processed per hour
      const itemsPerHour = (currentOutput * 60) / step.processingTime

      // Calculate required stations based on processing capacity
      const requiredStations = Math.ceil(itemsPerHour / (step.parallelProcessing ? 60 : 1))
      stations[step.station] = requiredStations

      // Calculate required inputs for this step
      step.inputs.forEach((input: { type: ItemType; quantity: number }) => {
        // Calculate the input quantity needed for the current output
        const inputQuantity = Math.ceil((currentOutput * input.quantity) / step.outputs[0].quantity)
        inputs[input.type] = (inputs[input.type] || 0) + inputQuantity
      })

      // Update current output for next step
      // We need to calculate how many inputs we need to produce the current output
      const inputQuantity = Math.ceil((currentOutput * step.inputs[0].quantity) / step.outputs[0].quantity)
      currentOutput = inputQuantity
    })

    setCalculatedRequirements({ stations, inputs })
  }

  React.useEffect(() => {
    calculateRequirements()
  }, [targetOutput, selectedChain])

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Production Calculator</h1>

        {/* Chain Selection */}
        <div className="mb-8">
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
        <div className="mb-8">
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
        <div className="mb-12 space-y-12">
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
                  <div className="absolute top-1/2 right-0 h-0 w-0 -translate-y-1/2 transform border-t-4 border-r-0 border-b-4 border-l-8 border-gray-600" />
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
  )
}

export default SimpleCalculator
