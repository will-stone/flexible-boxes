import produce from 'immer'
import { IBox } from '../model'

export const deleteBox = (boxes: [IBox], path: number[]) =>
  produce(boxes, draft => {
    let pathIndex = 0
    const recursion = (arr: IBox[]) => {
      if (pathIndex === path.length - 1) {
        arr.splice(path[pathIndex], 1)
      } else {
        const children = arr[path[pathIndex]].c
        if (children) {
          pathIndex++
          recursion(children)
        } else {
          throw new Error('corrupt path')
        }
      }
      return arr
    }
    recursion(draft)
  })
