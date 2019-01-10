import { mutableArraySwap } from '../array.mutableSwap'

describe('utils/array.mutableSwap', () => {
  it('should swap', () => {
    const arr = ['one', 'two', 'three', 'four']
    mutableArraySwap(arr, 1, 2)
    expect(arr).toEqual(['one', 'three', 'two', 'four'])
    mutableArraySwap(arr, 0, 3)
    expect(arr).toEqual(['four', 'three', 'two', 'one'])
  })
})
