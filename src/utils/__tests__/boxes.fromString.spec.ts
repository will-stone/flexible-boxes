import { IBox } from '../../model'
import { boxesFromString } from '../boxes.fromString'

const boxes: IBox[] = [
  { c: [{}, { c: [{}] }, { c: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] }] },
]

describe('boxes.toString', () => {
  it('should parse string to boxes obj', () => {
    expect(
      boxesFromString("~(~(c~(~()~(c~(~()))~(c~(~(t~'a)~(t~'b)~(t~'c))))))"),
    ).toEqual(boxes)
  })
})
