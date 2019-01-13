import { IBox } from '../../model'
import { boxesToString } from '../boxes.toString'

const boxes: IBox[] = [{ c: [{}, { c: [{}] }, { c: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] }] }]

describe('boxes.toString', () => {
  it('should convert boxes obj to short string', () => {
    expect(boxesToString(boxes)).toBe("~(~(c~(~()~(c~(~()))~(c~(~(t~'a)~(t~'b)~(t~'c))))))")
  })
})
