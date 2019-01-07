import { deleteBox } from '../deleteBox'
import { IBox } from '../../model'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/deleteBox', () => {
  it('should delete a box', () => {
    const newBoxes = deleteBox(boxes, [0, 2])
    expect(newBoxes).toEqual([{ c: [{}, {}] }])
  })

  it('should delete a nested box', () => {
    const newBoxes = deleteBox(boxes, [0, 2, 1])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}] }] }])
  })
})
