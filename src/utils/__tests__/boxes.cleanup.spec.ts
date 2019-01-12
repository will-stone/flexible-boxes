import { cleanupBoxes } from '../boxes.cleanup'

describe('boxes.cleanup', () => {
  it('should remove empty children', () => {
    expect(cleanupBoxes([{ c: [{ c: [] }] }])).toEqual([{ c: [{}] }])
  })

  it('should replace spaces in titles with underscores', () => {
    expect(cleanupBoxes([{ c: [{ t: 'a space' }] }])).toEqual([{ c: [{ t: 'a_space' }] }])
  })

  it('should remove defaults', () => {
    expect(
      cleanupBoxes([
        {
          c: [
            {
              t: '',
              d: 'row',
              w: 'nowrap',
              g: 0,
              s: 1,
              b: 'auto',
              jc: 'flex-start',
              ac: 'stretch',
              ai: 'stretch',
              as: 'auto'
            }
          ]
        }
      ])
    ).toEqual([{ c: [{}] }])
  })
})
