import { current, produce } from 'immer'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'

export const sanitiseBoxes = produce((box) => {
  if (!isPlainObject(box)) {
    throw new Error('Corrupt box')
  }

  for (const key of Object.keys(box)) {
    switch (key) {
      // direction
      case 'd':
        if (box.d !== 'column') {
          delete box.d
        }

        break

      // wrap
      case 'w':
        if (box.w !== 'wrap') {
          delete box.w
        }

        break

      // grow
      case 'g':
        if (!isNumber(box.g) || Number.parseInt(box.g, 10) === 0) {
          delete box.g
        }

        break

      // shrink
      case 's':
        if (Number.parseInt(box.s, 10) === 1) {
          delete box.s
        }

        break

      // basis
      case 'b':
        if (box.b === 'auto') {
          delete box.b
        }

        break

      // justify-content
      case 'jc':
        if (box.jc === 'flex-start') {
          delete box.jc
        }

        break

      // align-content
      case 'ac':
        if (box.ac === 'stretch') {
          delete box.ac
        }

        break

      // align-items
      case 'ai':
        if (box.ai === 'stretch') {
          delete box.ai
        }

        break

      // align-items
      case 'as':
        if (box.as === 'auto') {
          delete box.as
        }

        break

      // children
      case 'c':
        // remove empty child object
        if (isEmpty(box.c)) {
          delete box.c
        }
        // Sanitise children
        else {
          for (const [index, childBox] of Object.entries(box.c || [])) {
            box.c[index] = sanitiseBoxes(current(childBox))
          }
        }

        break

      // Remove unknown properties
      default:
        delete box[key]
        break
    }
  }
})
