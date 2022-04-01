import { createReducer } from '@reduxjs/toolkit'

import { clickedDummyButton } from './actions'

export interface Box {
  c?: Box[]
  g?: number
}

export interface UI {
  colour: 'GREEN' | 'RED'
  boxes: Box
}

export const defaultData: UI = {
  colour: 'RED',
  boxes: {
    id: 
    c: [
      {
        c: [{}, {}],
      },
    ],
  },
}

export const ui = createReducer<UI>(defaultData, (builder) =>
  builder.addCase(clickedDummyButton, (state) => {
    state.colour = state.colour === 'GREEN' ? 'RED' : 'GREEN'
  }),
)
