import { mutableArrayDelete } from '../array.mutableDelete'

describe('utils/array.mutableDelete', () => {
  it('should swap', () => {
    const arr = ['one', 'two', 'three', 'four']
    mutableArrayDelete(arr, 1)
    expect(arr).toEqual(['one', 'three', 'four'])
    mutableArrayDelete(arr, 2)
    expect(arr).toEqual(['one', 'three'])
  })
})
