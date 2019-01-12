import { IBox } from '../../model'
import { flattenBoxes } from '../boxes.flatten'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/boxes.flatten', () => {
  it('should flatten arrays of boxes', () => {
    const flattenedBoxes = flattenBoxes(boxes)
    expect(flattenedBoxes).toEqual([
      { c: [{}, {}, { c: [{}, {}] }], path: [0] },
      { path: [0, 0] },
      { path: [0, 1] },
      { c: [{}, {}], path: [0, 2] },
      { path: [0, 2, 0] },
      { path: [0, 2, 1] }
    ])
  })
})
