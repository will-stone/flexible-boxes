import { IBox } from '../../model'
import { moveBox } from '../box.move'

const boxes: IBox[] = [{ c: [{}, { c: [{}] }, { c: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] }] }]

describe('boxUtils/box.move', () => {
  it('should move first in array box up', () => {
    const [newBoxes, newPath] = moveBox(boxes, [0, 0], 'up')
    expect(newBoxes).toEqual([
      {},
      { c: [{ c: [{}] }, { c: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] }] },
    ])
    expect(newPath).toEqual([0])
  })

  it('should move a non-first in array box up', () => {
    const [newBoxes, newPath] = moveBox(boxes, [0, 2], 'up')
    expect(newBoxes).toEqual([
      { c: [{}, { c: [{}, { c: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] }] }] },
    ])
    expect(newPath).toEqual([0, 1, 1])
  })

  it('should swap a box up', () => {
    const [newBoxes, newPath] = moveBox(boxes, [0, 2, 2], 'up')
    expect(newBoxes).toEqual([
      { c: [{}, { c: [{}] }, { c: [{ t: 'a' }, { t: 'c' }, { t: 'b' }] }] },
    ])
    expect(newPath).toEqual([0, 2, 1])
  })

  it('should move a non-last in array box down', () => {
    const [newBoxes, newPath] = moveBox(boxes, [0, 1], 'down')
    expect(newBoxes).toEqual([
      { c: [{}, { c: [{ c: [{}] }, { t: 'a' }, { t: 'b' }, { t: 'c' }] }] },
    ])
    expect(newPath).toEqual([0, 1, 0])
  })

  it('should move last in array box down', () => {
    const [newBoxes, newPath] = moveBox(boxes, [0, 2], 'down')
    expect(newBoxes).toEqual([
      { c: [{}, { c: [{}] }] },
      { c: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] },
    ])
    expect(newPath).toEqual([1])
  })

  it('should swap a box down', () => {
    const [newBoxes, newPath] = moveBox(boxes, [0, 2, 0], 'down')
    expect(newBoxes).toEqual([
      { c: [{}, { c: [{}] }, { c: [{ t: 'b' }, { t: 'a' }, { t: 'c' }] }] },
    ])
    expect(newPath).toEqual([0, 2, 1])
  })
})
