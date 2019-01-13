import produce from 'immer'
import { IBox } from '../model'

export const cleanupBoxes = (boxes: IBox[]) =>
  produce(boxes, draft => {
    const recursion = (boxes: IBox[]) => {
      boxes.forEach(box => {
        // Children
        const children = box.c
        if (!children || children.length === 0) {
          delete box.c
        } else {
          recursion(children)
        }

        // Text
        if (!box.t || box.t === '') delete box.t
        // spaces to underscores
        else box.t = box.t.replace(' ', '_')

        // Flex Direction
        if (!box.d || box.d === 'row') delete box.d

        // Flex Wrap
        if (!box.w || box.w === 'nowrap') delete box.w

        // Flex Grow
        if (!box.g) delete box.g

        // Flex Shrink
        if ((!box.s && box.s !== 0) || box.s === 1) delete box.s

        // Flex Basis
        if (!box.b || box.b === 'auto') delete box.b

        // Justify Content
        if (!box.jc || box.jc === 'flex-start') delete box.jc

        // Align Content
        if (!box.ac || box.ac === 'stretch') delete box.ac

        // Align Items
        if (!box.ai || box.ai === 'stretch') delete box.ai

        // Align Self
        if (!box.as || box.as === 'auto') delete box.as

        // TODO include cleaning up types that are not allowed.
      })
    }

    recursion(draft)
  })
