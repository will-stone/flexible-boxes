import { insertBox } from '../box.insert'
import { IBox } from '../../model'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/box.insert', () => {
  it('should insert a box', () => {
    const newBox = { t: 'Title', g: 1 }
    const newBoxes = insertBox(boxes, newBox, [0, 2])
    expect(newBoxes).toEqual([{ c: [{}, {}, newBox, { c: [{}, {}] }] }])
  })

  it('should insert a nested box', () => {
    const newBox = { t: 'Title', g: 1 }
    const newBoxes = insertBox(boxes, newBox, [0, 2, 1])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, newBox, {}] }] }])
  })

  it('should insert a box with offset index', () => {
    const newBox = { t: 'Title', g: 1 }
    const newBoxes = insertBox(boxes, newBox, [0, 1], 1)
    expect(newBoxes).toEqual([{ c: [{}, {}, newBox, { c: [{}, {}] }] }])
  })
})
