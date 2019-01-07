import { IBox } from '../model'
import produce from 'immer'

export const resetBox = (boxes: [IBox], path: number[]) =>
  produce(boxes, draft => {
    let pathIndex = 0
    const recursion = (obj: IBox) => {
      if (pathIndex === path.length - 1) {
        for (const key in obj) delete obj[key as keyof IBox]
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
