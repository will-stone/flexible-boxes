import produce from 'immer'
import { IBox } from '../model'
import { selectBox } from './box.select'

export const addBoxTo = (boxes: [IBox], path: number[]) =>
  produce(boxes, draft => {
    const box = selectBox(draft, path)
    if (box.c) {
      box.c.push({})
    } else {
      box.c = [{}]
    }
  })
