import { createReducer } from '@reduxjs/toolkit'
import jsurl from 'jsurl'

import { sanitiseBoxes } from '../lib/sanitiseBoxes'
import { appStarted } from './actions'

const defaultBoxes = { 1: { c: [] } }

const ui = createReducer(
  {
    selectedBoxId: undefined,
    boxes: defaultBoxes,
    screenWarningHidden: true,
  },
  (builder) =>
    builder.addCase(appStarted, (state) => {
      try {
        const parsedBoxes = jsurl.parse(window.location.hash.slice(1))
        state.boxes = sanitiseBoxes(parsedBoxes)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('URL configuration is corrupt, resetting...', error)
        state.boxes = defaultBoxes
      }
    }),
)

export { ui }
