import ContextMenu from '@imengyu/vue3-context-menu'

export interface ContextMenuAction { label: string; onClick: () => void }

export function showContextMenu(event: MouseEvent, actions: ContextMenuAction[]) {
  console.log('showContextMenu called', { x: event.clientX, y: event.clientY, actions })
  try {
    ContextMenu.showContextMenu({
      x: event.clientX,
      y: event.clientY,
      items: actions.map((action) => ({
        label: action.label,
        onClick: action.onClick,
      })),
    })
    console.log('showContextMenu executed successfully')
  } catch (e) {
    console.error('showContextMenu error', e)
  }
}
