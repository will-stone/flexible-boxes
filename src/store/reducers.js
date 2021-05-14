import { createReducer } from '@reduxjs/toolkit'

import { appStarted } from './actions'

const ui = createReducer(
  {
    selectedBoxId: undefined,
    boxes: { 1: { c: [] } },
    screenWarningHidden: true,
  },
  (builder) => builder.addCase(appStarted, (_, action) => action.payload),
)

export { ui }
