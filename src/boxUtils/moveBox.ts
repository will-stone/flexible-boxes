import produce from 'immer'
import { IBox } from '../model'
import { deleteBox } from './deleteBox'
import { insertBox } from './insertBox'

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
            draft = deleteBox(draft, path)
            draft = insertBox(draft, box, parentPath)
          } else {
            // swap
            ;[arr[currentPathNumber], arr[currentPathNumber - 1]] = [
              arr[currentPathNumber - 1],
              arr[currentPathNumber]
            ]
          }
        }
        if (direction === 'down') {
          if (currentPathNumber === arr.length - 1) {
            draft = deleteBox(draft, path)
            draft = insertBox(draft, box, parentPath, 1)
          } else {
            // swap
            ;[arr[currentPathNumber], arr[currentPathNumber + 1]] = [
              arr[currentPathNumber + 1],
              arr[currentPathNumber]
            ]
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
