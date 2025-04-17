'use client'

import type { ProductionOutput } from '@/types'

interface ResultsPanelProps {
  results: {
    output: ProductionOutput
    time: number
  } | null
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  if (!results) {
    return (
      <div className="text-gray-500 italic">
        Select equipment to see production results
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Production Results</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Output</h3>
          <p className="text-lg">
            {results.output.quantity}x {results.output.type.replace(/_/g, ' ')}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Quality</h3>
          <p className="text-lg">{results.output.quality}%</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Time</h3>
          <p className="text-lg">{results.time} minutes</p>
        </div>
      </div>
    </div>
  )
} 