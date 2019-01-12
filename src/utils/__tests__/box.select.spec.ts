import { IBox } from '../../model'
import { selectBox } from '../box.select'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/box.select', () => {
  it('should select a box', () => {
    const selectedBox = selectBox(boxes, [0, 2])
    expect(selectedBox).toEqual({ c: [{}, {}] })
  })

  it('should select a nested box', () => {
    const selectedBox = selectBox(boxes, [0, 2, 1])
    expect(selectedBox).toEqual({})
  })
})
