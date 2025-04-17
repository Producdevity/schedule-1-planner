import {
  type DragCancelEvent,
  type DragEndEvent,
  type DragStartEvent,
  useDndMonitor,
} from '@dnd-kit/core'

type Props = {
  onDragStart?: (ev: DragStartEvent) => void
  onDragEnd?: (ev: DragEndEvent) => void
  onDragCancel?: (ev: DragCancelEvent) => void
}

function DragMonitor(props: Props) {
  useDndMonitor({
    onDragStart: (ev: DragStartEvent) => props.onDragStart?.(ev),
    onDragEnd: (ev: DragEndEvent) => props.onDragEnd?.(ev),
    onDragCancel: (ev: DragCancelEvent) => props.onDragCancel?.(ev),
  })

  return null
}

export default DragMonitor
