'use client'
import { type Item } from '@/types'
import { useDraggable } from '@dnd-kit/core'
import { type CSSProperties } from 'react'

type Props = {
  item: Item
  position: { x: number; y: number }
  isDragging: boolean
}

const GRID_SIZE = 50

function DraggableBox(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.item.id,
  })

  const style: CSSProperties = {
    width: GRID_SIZE * 2 - 2,
    height: GRID_SIZE * 2 - 2,
    marginTop: 1,
    marginLeft: 1,
    backgroundColor: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    transform: `translate3d(${(transform?.x ?? 0) + props.position.x}px, ${(transform?.y ?? 0) + props.position.y}px, 0)`,
    cursor: 'grab',
    boxShadow: props.isDragging ? '0 8px 20px rgba(0, 0, 0, 0.3)' : 'none',
    opacity: props.isDragging ? 0.85 : 1,
    transition: 'box-shadow 120ms, transform 120ms, opacity 120ms',
  }
  console.log('position', props.position)

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {props.item.type}
    </div>
  )
}

export default DraggableBox
