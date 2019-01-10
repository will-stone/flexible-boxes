import produce from 'immer'
import { IBox } from '../model'
import { mutableArrayInsertAt } from './array.mutableInsertAt'

export const insertBox = (boxes: [IBox], box: IBox, path: number[], offset = 0) =>
  produce(boxes, draft => {
    let pathIndex = 0
    const recursion = (arr: IBox[]) => {
      if (pathIndex === path.length - 1) {
        mutableArrayInsertAt(arr, box, path[pathIndex] + offset)
      } else {
        const children = arr[path[pathIndex]].c
        if (children) {
          pathIndex++
          recursion(children)
        } else {
          throw new Error('corrupt path')
        }
      }
    }
    recursion(draft)
  })
