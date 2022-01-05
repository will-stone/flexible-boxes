import { createAction as cA } from '@reduxjs/toolkit'

const appStarted = cA('app/started')
const removeBrowserWarning = cA('browserWarning/remove')

/**
 * Box
 */
const clearBoxes = cA('boxes/clear')
const moveBox = cA('box/move')
const selectBox = cA('box/select')
const addBoxTo = cA('box/addTo')
const deleteBox = cA('box/deleteBox')
const resetBox = cA('box/resetBox')
const updateBoxProperty = cA('box/updateBox')

export {
  addBoxTo,
  appStarted,
  clearBoxes,
  deleteBox,
  moveBox,
  removeBrowserWarning,
  resetBox,
  selectBox,
  updateBoxProperty,
}
