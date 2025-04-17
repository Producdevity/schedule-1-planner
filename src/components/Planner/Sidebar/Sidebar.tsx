'use client'
import placeableItems from '@/data/placeableItems'

function Sidebar() {
  return (
    <aside>
      <h2>Placeable Items</h2>
      <div className="grid grid-cols-2 gap-4">
        {placeableItems.map((item) => (
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
