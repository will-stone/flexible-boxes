import { createAction } from '@reduxjs/toolkit'

const cA = createAction

const clickedDummyButton = cA('dummy-button/clicked')

export { clickedDummyButton }
