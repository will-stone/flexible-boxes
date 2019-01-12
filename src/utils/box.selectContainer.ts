import { IBox } from '../model'

export const selectContainer = (
  boxes: [IBox],
  path: number[],
  parentOffset: number = 0
): IBox[] => {
  if (path.length - parentOffset === 1) {
    if (path[0] !== 0) throw new Error('first item in path should alwasy be 0')
    return boxes
  }

  const rootChildren = boxes[0].c
  if (!rootChildren) throw new Error('root box has no children')

  let pathIndex = 0
  const recursion = (arr: IBox[]): IBox[] => {
    pathIndex++
    if (pathIndex === path.length - 1 - parentOffset) {
      return arr
    } else {
      const children = arr[path[pathIndex]].c
      if (children) {
        return recursion(children)
      } else {
        throw new Error('corrupt path')
      }
    }
  }
  return recursion(rootChildren)
}
