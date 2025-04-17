'use client'

import GrowTent from "@/models/production/GrowTent"

const productionItems = [
  { type: 'grow_tent', category: 'agriculture', price: 100, factory: GrowTent,  },
]
function Sidebar() {
  return (
    <aside>
      <h2>Placeable Items</h2>
      <div className="grid grid-cols-2 gap-4">
        {productionItems.map((item) => (
          <div key={item.type} className="rounded border p-4">
            <h3>{item.type}</h3>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
