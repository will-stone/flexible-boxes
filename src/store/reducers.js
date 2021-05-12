import { createReducer } from '@reduxjs/toolkit'

import { appStarted } from './actions'

// eslint-disable-next-line unicorn/no-null
const selectedBoxId = createReducer(null, (builder) =>
  builder.addCase(appStarted, (_, action) => action.payload),
)

export { selectedBoxId }
