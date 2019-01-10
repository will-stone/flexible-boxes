import { moveBox } from '../box.move'
import { IBox } from '../../model'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/box.insert', () => {
  it('should move first in array box up', () => {
    const newBoxes = moveBox(boxes, [0, 0], 'up')
    expect(newBoxes).toEqual([{}, { c: [{}, { c: [{}, {}] }] }])
  })

  it('should move a non-first in array box up', () => {
    const newBoxes = moveBox(boxes, [0, 2], 'up')
    expect(newBoxes).toEqual([{ c: [{}, { c: [{}, {}] }, {}] }])
  })

  it('should move a non-last in array box down', () => {
    const newBoxes = moveBox(boxes, [0, 1], 'down')
    expect(newBoxes).toEqual([{ c: [{}, { c: [{}, {}] }, {}] }])
  })

  it('should move last in array box down', () => {
    const newBoxes = moveBox(boxes, [0, 2], 'down')
    expect(newBoxes).toEqual([{ c: [{}, {}] }, { c: [{}, {}] }])
  })
})
