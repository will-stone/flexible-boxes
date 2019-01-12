import { IBox, IFlattenedBox } from '../model'

export const flattenBoxes = (boxes: IBox[]) => {
  const toBePushed: IFlattenedBox[] = []
  const recursion = (arr: IBox[], path: number[]) => {
    arr.forEach((box: IBox, i) => {
      const updatedPath = [...path, i]
      toBePushed.push({ ...box, path: updatedPath })
      const children = box.c
      if (children && children.length) {
        recursion(children, updatedPath)
      }
    })
  }
  recursion(boxes, [])
  return toBePushed
}
