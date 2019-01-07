import { updateBox } from '../updateBox'
import { IBox } from '../../model'

const boxes: [IBox] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/updateBox', () => {
  it('should update first box', () => {
    const newBoxes = updateBox(boxes, [0], 't', 'Title')
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, {}] }], t: 'Title' }])
  })

  it('should update nested box', () => {
    const newBoxes = updateBox(boxes, [0, 1], 't', 'Title')
    expect(newBoxes).toEqual([{ c: [{}, { t: 'Title' }, { c: [{}, {}] }] }])
  })

  it('should update deeply nested box', () => {
    const newBoxes = updateBox(boxes, [0, 2, 1], 't', 'Title')
    expect(newBoxes).toEqual([{ c: [{}, {}, { c: [{}, { t: 'Title' }] }] }])
  })
})
