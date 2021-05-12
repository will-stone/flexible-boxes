import { createReducer } from '@reduxjs/toolkit'

import { appStarted } from './actions'

const ui = createReducer({ selectedBoxId: undefined }, (builder) =>
  builder.addCase(appStarted, (_, action) => action.payload),
)

export { ui }
