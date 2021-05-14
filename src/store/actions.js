import { createAction as cA } from '@reduxjs/toolkit'

const appStarted = cA('app/started')
const removeBrowserWarning = cA('browserWarning/remove')

/**
 * Box
 */
const moveBox = cA('box/move')
const selectBox = cA('box/select')
const addBoxTo = cA('box/addTo')
const deleteBox = cA('box/deleteBox')
const resetBox = cA('box/resetBox')
const updateBoxProperty = cA('box/updateBox')

/**
 * Box Title
 */
const editTitle = cA('box/editTitle')
const updateTitle = cA('box/updateTitle')

export {
  addBoxTo,
  appStarted,
  deleteBox,
  editTitle,
  moveBox,
  removeBrowserWarning,
  resetBox,
  selectBox,
  updateBoxProperty,
  updateTitle,
}
