import produce from 'immer'

export const sanitiseBox = produce((box) => {
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
        if (Number.parseInt(box.g, 10) === 0) {
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
})
