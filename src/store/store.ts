import type { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'

import { ui } from './reducer.ui'

export const store = configureStore({
  reducer: { ui },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = (): Dispatch<AnyAction> &
  ThunkDispatch<RootState, null, AnyAction> &
  ThunkDispatch<RootState, undefined, AnyAction> =>
  useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
