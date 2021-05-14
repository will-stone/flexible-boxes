/* eslint-disable max-depth */
import produce from 'immer'
import isNumber from 'lodash/isNumber'

export const sanitiseBoxes = produce((boxes) => {
  let counter = 1
  for (const [boxId, box] of Object.entries(boxes)) {
    // second clause is dirty check for corrupt boxes; checks box IDs start at 1 and are sequential.
    if (box && Number.parseInt(boxId, 10) === counter) {
      for (const key of Object.keys(box)) {
        switch (key) {
          // title
          case 't':
            // spaces to underscores
            box.t = box.t.replace(' ', '_')
            break

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
            if (typeof value === 'object' && Object.keys(box.c).length === 0) {
              delete box.c
            }

            break

          // Remove unknown properties
          default:
            delete box[key]
            break
        }
      }

      counter = counter + 1
    } else {
      throw new Error('Do you have duplicate box IDs in the URL?')
    }
  }
})
