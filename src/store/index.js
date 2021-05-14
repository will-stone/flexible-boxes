import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { ui } from './reducers'
import { updateUrlMiddleware } from './update-url.middleware'

// Root Reducer
const rootReducer = combineReducers({ ui })

// Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    updateUrlMiddleware(),
  ],
})

export default store
