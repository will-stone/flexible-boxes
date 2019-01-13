import { IBox } from '../../model'
import { resetBox } from '../box.reset'

const boxes: IBox[] = [{ t: 'title', c: [{}, {}, { c: [{}, { g: 1 }] }] }]

describe('boxUtils/box.reset', () => {
  it('should reset a box', () => {
    const newBoxes = resetBox(boxes, [0])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, { g: 1 }] }] }])
  })

  it('should reset a nested box', () => {
    const newBoxes = resetBox(boxes, [0, 2, 1])
    expect(newBoxes).toEqual([{ t: 'title', c: [{}, {}, { c: [{}, {}] }] }])
  })
})
