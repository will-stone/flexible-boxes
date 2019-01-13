import { IBox } from '../../model'
import { addBoxTo } from '../box.addTo'

const boxes: IBox[] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/box.addTo', () => {
  it('should add a box', () => {
    const newBoxes = addBoxTo(boxes, [0])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, {}] }, {}] }])
  })

  it('should add a nested box', () => {
    const newBoxes = addBoxTo(boxes, [0, 2, 1])
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, { c: [{}] }] }] }])
  })
})
