import { createReducer } from '@reduxjs/toolkit'

import { clickedDummyButton } from './actions'

export interface UI {
  colour: 'GREEN' | 'RED'
}

export const defaultData: UI = {
  colour: 'RED',
}

export const ui = createReducer<UI>(defaultData, (builder) =>
  builder.addCase(clickedDummyButton, (state) => {
    state.colour = state.colour === 'GREEN' ? 'RED' : 'GREEN'
  }),
)
