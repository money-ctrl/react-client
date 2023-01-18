import * as types from '@/constants'

/**
 * queue: {
 *   header: null | React.Component
 *   optionList: {
 *     label: string,
 *     onClick: () => void,
 *   }[],
 * }[]
 **/

export const initialState = Object.freeze({
  isOpen: false,
  queue: [],
})

const injectProcessedIsOpen = (state) => {
  const [current = {}] = state.queue
  const hasOptions = (current.optionList || []).length > 0
  const hasHeader = Boolean(current.header)
  const isOpen = hasOptions || hasHeader

  return {
    ...state,
    isOpen,
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CONTEXT_ASSIGN:
      return {
        ...state,
        ...action.payload,
      }
    case types.CONTEXT_ENQUEUE:
      return injectProcessedIsOpen({
        ...state,
        queue: [...state.queue, action.payload]
      })
    case types.CONTEXT_NEXT: {
      const [, ...newQueue] = state.queue

      return injectProcessedIsOpen({
        ...state,
        queue: newQueue,
      })
    }
    default:
      return state
  }
}

