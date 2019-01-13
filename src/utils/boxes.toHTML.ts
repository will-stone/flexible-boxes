import repeat from 'lodash/repeat'
import { IBox } from '../model'

export const boxesToHTML = (boxes: IBox[]) => {
  const htmlArr: string[] = []
  const recursion = (arr: IBox[], path: number[], indent: number) => {
    arr.forEach((box: IBox, i) => {
      const id = [...path, i]
      htmlArr.push(`${repeat('  ', indent)}<div class="fb fb__${id.join('')}-${box.t || 'box'}">`)
      const children = box.c
      if (children && children.length) {
        recursion(children, id, indent + 1)
      } else {
        htmlArr.push(`${repeat('  ', indent + 1)}<!-- ${box.t || 'box'} -->`)
        htmlArr.push('')
      }
      htmlArr.push(`${repeat('  ', indent)}</div>`)
    })
  }
  recursion(boxes, [], 0)
  return htmlArr.join('\n')
}
