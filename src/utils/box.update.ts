import produce from 'immer'
import { IBox } from '../model'

export const updateBox = (boxes: [IBox], path: number[], key: keyof IBox, value: any) =>
  produce(boxes, draft => {
    let pathIndex = 0
    const recursion = (obj: IBox) => {
      if (pathIndex === path.length - 1) {
        obj[key] = value
      } else {
        pathIndex++
        if (obj.c && obj.c[path[pathIndex]]) {
          recursion(obj.c[path[pathIndex]])
        } else {
          throw new Error('corrupt path')
        }
      }
      return obj
    }
    recursion(draft[path[pathIndex]])
  })
