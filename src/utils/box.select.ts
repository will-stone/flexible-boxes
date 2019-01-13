import { IBox } from '../model'

export const selectBox = (boxes: IBox[], path: number[], parentOffset: number = 0): IBox => {
  let pathIndex = 0
  const recursion = (box: IBox): IBox => {
    if (pathIndex === path.length - 1 - parentOffset) {
      return box
    } else {
      pathIndex++
      const children = box.c
      if (children) {
        return recursion(children[path[pathIndex]])
      } else {
        throw new Error('corrupt path')
      }
    }
  }
  return recursion(boxes[path[0]])
}
