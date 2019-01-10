import produce from 'immer'
import { IBox } from '../model'
import { insertBox } from './box.insert'
import { mutableArraySwap } from './array.mutableSwap'
import { mutableArrayDelete } from './array.mutableDelete'

export const moveBox = (boxes: [IBox], path: number[], direction: 'up' | 'down') =>
  produce(boxes, draft => {
    let pathIndex = 0
    const recursion = (arr: IBox[]) => {
      if (pathIndex === path.length - 1) {
        const parentPath = [...path]
        parentPath.pop()
        const currentPathNumber = path[pathIndex]
        const box = arr[currentPathNumber]
        if (direction === 'up') {
          if (currentPathNumber === 0) {
            mutableArrayDelete(arr, currentPathNumber)
            draft = insertBox(draft, box, parentPath)
          } else {
            mutableArraySwap(arr, currentPathNumber, currentPathNumber - 1)
          }
        }
        if (direction === 'down') {
          if (currentPathNumber === arr.length - 1) {
            mutableArrayDelete(arr, currentPathNumber)
            draft = insertBox(draft, box, parentPath, 1)
          } else {
            mutableArraySwap(arr, currentPathNumber, currentPathNumber + 1)
          }
        }
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
