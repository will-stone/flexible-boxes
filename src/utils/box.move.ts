import produce from 'immer'
import { IBox } from '../model'
import { mutableArraySwap } from './array.mutableSwap'
import { selectBox } from './box.select'
import { selectContainer } from './box.selectContainer'

export const moveBox = (boxes: [IBox], path: number[], direction: 'up' | 'down') => {
  const newPath = [...path]
  const newBoxes = produce(boxes, draft => {
    const currentIndex = path[path.length - 1]
    const parentIndex = path[path.length - 2]
    const box = selectBox(draft, path)
    const boxContainer = selectContainer(draft, path)
    const parentContainer = selectContainer(draft, path, 1)
    if (direction === 'up') {
      if (currentIndex === 0) {
        boxContainer.splice(currentIndex, 1)
        parentContainer.splice(parentIndex, 0, box)
        newPath.pop()
      } else {
        const aboveChildren = boxContainer[currentIndex - 1].c
        if (aboveChildren && aboveChildren.length) {
          boxContainer.splice(currentIndex, 1)
          aboveChildren.push(box)
          newPath[newPath.length - 1] = newPath[newPath.length - 1] - 1
          newPath.push(aboveChildren.length - 1)
        } else {
          mutableArraySwap(boxContainer, currentIndex, currentIndex - 1)
          newPath[newPath.length - 1] = newPath[newPath.length - 1] - 1
        }
      }
    }
    if (direction === 'down') {
      if (currentIndex === boxContainer.length - 1) {
        boxContainer.splice(currentIndex, 1)
        parentContainer.splice(parentIndex + 1, 0, box)
        newPath.pop()
        newPath[newPath.length - 1] = newPath[newPath.length - 1] + 1
      } else {
        const belowChildren = boxContainer[currentIndex + 1].c
        if (belowChildren && belowChildren.length) {
          boxContainer.splice(currentIndex, 1)
          belowChildren.unshift(box)
          newPath.push(0)
        } else {
          mutableArraySwap(boxContainer, currentIndex, currentIndex + 1)
          newPath[newPath.length - 1] = newPath[newPath.length - 1] + 1
        }
      }
    }
  })
  return [newBoxes, newPath]
}
