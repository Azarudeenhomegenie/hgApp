

import { createReducer } from 'utils/index'

const type = {
  start: 'progressActions/start',
  end: 'progressActions/end',
  clear: 'progressActions/clear',
}

const initialState = {
  actions: [],
  percent: -1,
}

export default createReducer(initialState, {
  [type.start]: (state, { action }) => {
    const actions = [...state.actions, action]

    return {
      ...state,
      ...(state.actions.length === 0) && {percent: 30},
      actions,
    }
  },
  [type.end]: (state, { action }) => {
    const index = state.actions.indexOf(action)
    const actions = index !== -1
        ? [...state.actions.slice(0, index), ...state.actions.slice(index + 1)]
        : state.actions

    return {
      ...state,
      ...(actions.length === 0) && {percent: 100},
      actions,
    }
  },
  [type.clear]: () => {
    return {
      ...initialState,
    }
  },
})

export const startAction = (action) => ({type: type.start, action})

export const clearActions = () => {
  return {type: type.clear}
}

export function endAction(action) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({type: type.end, action})
    }, 200)
  }
}
