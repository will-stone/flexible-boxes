import { resetBox } from '../box.reset'
import { IBox } from '../../model'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/box.reset', () => {
  it('should reset a box', () => {
    const newBoxes = resetBox(boxes, [0])
    expect(newBoxes).toEqual([{}])
  })

  it('should reset a nested box', () => {
    const newBoxes = resetBox(boxes, [0, 2, 1])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, {}] }] }])
  })
})
