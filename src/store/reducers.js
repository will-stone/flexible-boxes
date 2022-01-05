import { createReducer } from '@reduxjs/toolkit'
import jsurl from 'jsurl'
import initial from 'lodash/initial'

import { sanitiseBoxes } from '../lib/sanitiseBoxes'
import {
  addBoxTo,
  appStarted,
  clearBoxes,
  deleteBox,
  selectBox,
} from './actions'

const defaultBoxes = {
  c: [{ t: '1' }, { t: '2', c: [{}, { t: 'nested' }, {}, {}] }, { t: '3' }],
}

const ui = createReducer(
  {
    selectedBoxPath: undefined,
    boxes: defaultBoxes,
    screenWarningHidden: true,
  },
  (builder) =>
    builder
      .addCase(appStarted, (state) => {
        try {
          const parsedBoxes = jsurl.parse(window.location.hash.slice(1))
          state.boxes = sanitiseBoxes(parsedBoxes)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('URL configuration is corrupt, resetting...', error)
          state.boxes = defaultBoxes
        }
      })

      /**
       * Select Box
       */
      .addCase(selectBox, (state, action) => {
        state.selectedBoxPath = action.payload
      })

      /**
       * Delete Box
       */
      .addCase(deleteBox, (state, { payload: path }) => {
        // Deselect box
        state.selectedBoxPath = undefined

        let box = state.boxes

        for (const pathItem of initial(path)) {
          box = box.c[pathItem]
        }

        // Remove box
        box.c.splice(path[path.length - 1], 1)
      })

      /**
       * Add Box
       */
      .addCase(addBoxTo, (state, { payload: path }) => {
        let box = state.boxes

        for (const pathItem of path) {
          box = box.c[pathItem]
        }

        // Remove box
        if (box.c) {
          box.c.push({})
        } else {
          box.c = [{}]
        }
      })

      /**
       * Clear boxes
       */
      .addCase(clearBoxes, (state) => {
        state.boxes = {}
      }),
)

export { ui }
