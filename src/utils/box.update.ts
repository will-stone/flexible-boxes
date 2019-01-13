import produce from 'immer'
import { IBox } from '../model'
import { selectBox } from './box.select'

export const updateBox = (
  boxes: IBox[],
  path: number[],
  key: keyof IBox,
  value: any,
) =>
  produce(boxes, draft => {
    const box = selectBox(draft, path)
    box[key] = value
  })
