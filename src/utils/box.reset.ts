import produce from 'immer'
import { IBox } from '../model'
import { selectBox } from './box.select'

export const resetBox = (boxes: IBox[], path: number[]) =>
  produce(boxes, draft => {
    const box = selectBox(draft, path)
    for (const key of Object.keys(box)) {
      if (key !== 'c') {
        delete box[key as keyof IBox]
      }
    }
  })
