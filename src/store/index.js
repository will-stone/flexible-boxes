import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { ui } from './reducers'

// Root Reducer
const rootReducer = combineReducers({ ui })

// Store
const store = configureStore({
  reducer: rootReducer,
})

export default store
