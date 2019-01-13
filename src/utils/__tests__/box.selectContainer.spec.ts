import { IBox } from '../../model'
import { selectContainer } from '../box.selectContainer'

const boxes: IBox[] = [{ c: [{}, {}, { c: [{}, {}] }] }]

describe('boxUtils/box.selectContainer', () => {
  it("should select root box's container", () => {
    const selectedBox = selectContainer(boxes, [0])
    expect(selectedBox).toEqual([{ c: [{}, {}, { c: [{}, {}] }] }])
  })

  it("should select a box's container", () => {
    const selectedBox = selectContainer(boxes, [0, 2])
    expect(selectedBox).toEqual([{}, {}, { c: [{}, {}] }])
  })

  it("should select a box's parent's container", () => {
    const selectedBox = selectContainer(boxes, [0, 2], 1)
    expect(selectedBox).toEqual([{ c: [{}, {}, { c: [{}, {}] }] }])
  })

  it("should select a nested box's container", () => {
    const selectedBox = selectContainer(boxes, [0, 2, 1])
    expect(selectedBox).toEqual([{}, {}])
  })

  it("should select a nested box's parent's container ", () => {
    const selectedBox = selectContainer(boxes, [0, 2, 1], 1)
    expect(selectedBox).toEqual([{}, {}, { c: [{}, {}] }])
  })
})
