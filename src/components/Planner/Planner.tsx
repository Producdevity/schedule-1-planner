'use client'

import Sidebar from '@/components/Planner/Sidebar/Sidebar'
import SnapToGrid from '@/components/Planner/SnapToGrid'

function App() {
  return (
    <main>
      <h1>Snap to Grid Example</h1>
      <div className="flex">
        <div className="w-1/4">
          <h2>Sidebar</h2>
          <Sidebar />
        </div>
        <div className="w-3/4">
          <h2>Grid Area</h2>
          <SnapToGrid />
        </div>
      </div>
    </main>
  )
}

export default App
