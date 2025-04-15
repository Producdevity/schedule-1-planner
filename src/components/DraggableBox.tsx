'use client'
import { type GridItem } from '@/types'
import { useDraggable } from '@dnd-kit/core'
import { type CSSProperties } from 'react'

type Props = {
  item: GridItem
  isDragging: boolean
}

const GRID_SIZE = 50

function DraggableBox(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.item.id,
  })

  const style: CSSProperties = {
    width: GRID_SIZE * props.item.width - 1,
    height: GRID_SIZE * props.item.height - 1,
    marginTop: 1,
    marginLeft: 1,
    backgroundColor: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    cursor: 'grab',
    transform: `translate3d(${(transform?.x ?? 0) + props.item.x}px, ${(transform?.y ?? 0) + props.item.y}px, 0)`,
    boxShadow: props.isDragging ? '0 8px 20px rgba(0, 0, 0, 0.3)' : 'none',
    opacity: props.isDragging ? 0.85 : 1,
    transition: 'box-shadow 120ms, transform 120ms, opacity 120ms',
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {props.item.type}
    </div>
  )
}

export default DraggableBox
