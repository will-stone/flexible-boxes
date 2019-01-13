import repeat from 'lodash/repeat'
import { IBox } from '../model'

export const boxesToCSS = (boxes: IBox[]) => {
  const cssArr: string[] = []
  const recursion = (arr: IBox[], path: number[]) => {
    arr.forEach((box: IBox, i) => {
      const id = [...path, i]
      const classArr: string[] = []

      // if has any css to set
      if (
        box.c ||
        box.b ||
        box.d ||
        box.g ||
        box.s ||
        box.w ||
        box.ac ||
        box.ai ||
        box.as ||
        box.js
      ) {
        classArr.push(`.fb__${id.join('')}-${box.t || 'box'} {`)

        for (const property of Object.keys(box)) {
          const value = box[property as keyof IBox]
          switch (property) {
            case 'c':
              classArr.push('  display: flex;')
              break

            case 'b':
              classArr.push(`  flex-basis: ${value};`)
              break

            case 'd':
              classArr.push('  flex-direction: column;')
              break

            case 'g':
              classArr.push(`  flex-grow: ${value};`)
              break

            case 's':
              classArr.push(`  flex-shrink: ${value};`)
              break

            case 'w':
              classArr.push(`  flex-wrap: ${value};`)
              break

            case 'ac':
              classArr.push(`  align-content: ${value};`)
              break

            case 'ai':
              classArr.push(`  align-items: ${value};`)
              break

            case 'as':
              classArr.push(`  align-self: ${value};`)
              break

            case 'jc':
              classArr.push(`  justify-content: ${value};`)
              break

            default:
              break
          }
        }

        classArr.push(`}`)
      }

      cssArr.push(classArr.join('\n'))

      const children = box.c
      if (children && children.length) {
        recursion(children, id)
      }
    })
  }
  recursion(boxes, [])
  return cssArr.filter(x => x).join('\n\n')
}
