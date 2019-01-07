import { addBoxTo } from '../addBoxTo'
import { IBox } from '../../model'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/addBoxTo', () => {
  it('should add a box', () => {
    const newBoxes = addBoxTo(boxes, [0])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, {}] }, {}] }])
  })

  it('should add a nested box', () => {
    const newBoxes = addBoxTo(boxes, [0, 2, 1])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, { c: [{}] }] }] }])
  })
})
