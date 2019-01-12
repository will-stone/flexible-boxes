import { IBox } from '../model'
import produce from 'immer'
import { selectBox } from './box.select'

export const resetBox = (boxes: [IBox], path: number[]) =>
  produce(boxes, draft => {
    const box = selectBox(draft, path)
    for (const key in box) delete box[key as keyof IBox]
  })
