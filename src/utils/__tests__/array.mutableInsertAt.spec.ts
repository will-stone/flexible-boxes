import { mutableArrayInsertAt } from '../array.mutableInsertAt'

describe('utils/array.mutableInsertAt', () => {
  it('should swap', () => {
    const arr = ['one', 'two', 'three', 'four']
    mutableArrayInsertAt(arr, 'item', 1)
    expect(arr).toEqual(['one', 'item', 'two', 'three', 'four'])
    mutableArrayInsertAt(arr, 'item', 4)
    expect(arr).toEqual(['one', 'item', 'two', 'three', 'item', 'four'])
  })
})
