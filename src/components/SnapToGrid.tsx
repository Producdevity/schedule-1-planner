'use client'
import DraggableBox from '@/components/DraggableBox'
import DragMonitor from '@/components/DragMonitor'
import { type GridItem } from '@/types'
import React, { useCallback, useMemo, useState } from 'react'
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  type Modifier,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'

function createMagnetSnapModifier(gridSize: number, threshold = gridSize / 2): Modifier {
  return ({ transform }) => {
    const snap = (value: number) => {
      const mod = value % gridSize
      if (Math.abs(mod) < threshold) {
        return value - mod
      } else if (Math.abs(mod - gridSize) < threshold) {
        return value + (gridSize - mod)
      }
      return value
    }

    return {
      ...transform,
      x: snap(transform.x),
      y: snap(transform.y),
    }
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const GRID_SIZE = 50

const initialItems: GridItem[] = [
  { id: 1, type: 'storage', x: 0, y: 0, width: 2, height: 2 },
  { id: 2, type: 'storage', x: 100, y: 200, width: 1, height: 2 },
  { id: 3, type: 'storage', x: 300, y: 300, width: 4, height: 1 },
]

function SnapToGrid() {
  const [items, setItems] = useState<GridItem[]>(initialItems)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const snapToGrid = useMemo(() => createMagnetSnapModifier(GRID_SIZE, GRID_SIZE / 4), [])
  const sensors = useSensors(useSensor(PointerSensor))
  const containerWidth = 600
  const containerHeight = 400
  const itemSize = { width: 100, height: 100 }

  const handleDragEnd = useCallback(
    (ev: DragEndEvent) => {
      setItems((prevItems) => {
        const activeItem = prevItems.find((item) => item.id === activeId)

        if (!activeItem) return prevItems

        const newX = activeItem.x + ev.delta.x
        const newY = activeItem.y + ev.delta.y

        const clampedX = clamp(newX, 0, containerWidth - itemSize.width)
        const clampedY = clamp(newY, 0, containerHeight - itemSize.height)

        const snappedX = Math.round(clampedX / GRID_SIZE) * GRID_SIZE
        const snappedY = Math.round(clampedY / GRID_SIZE) * GRID_SIZE

        return prevItems.map((item) =>
          item.id === activeId ? { ...item, x: snappedX, y: snappedY } : item,
        )
      })
    },
    [activeId, itemSize.height, itemSize.width],
  )

  return (
    <div className="p-8">
      <div
        className="relative mt-4 overflow-hidden border border-gray-300"
        style={{
          width: containerWidth,
          height: containerHeight,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          backgroundImage:
            'linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)',
        }}
      >
        <DndContext sensors={sensors} modifiers={[snapToGrid]} onDragEnd={handleDragEnd}>
          <DragMonitor
            onDragStart={(ev) => setActiveId(ev.active.id)}
            onDragEnd={() => setActiveId(null)}
            onDragCancel={() => setActiveId(null)}
          />
          {items.map((item) => (
            <DraggableBox key={item.id} item={item} isDragging={activeId === item.id} />
          ))}
        </DndContext>
      </div>
    </div>
  )
}

export default SnapToGrid
