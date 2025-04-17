'use client'

function Calculator() {
  // nice app interface using tailwind, with a sidebar and a main content area
  return (  
    <div className="flex flex-col h-screen">
      <div className="flex flex-row h-full">
        <div className="w-1/4 bg-gray-100">Sidebar</div>
        <div className="w-3/4 bg-gray-200">Main content</div>
      </div>
    </div>
  )
}
export default Calculator