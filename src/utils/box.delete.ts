import produce from 'immer'
import { IBox } from '../model'
import { selectContainer } from './box.selectContainer'

export const deleteBox = (boxes: IBox[], path: number[]) =>
  produce(boxes, draft => {
    const container = selectContainer(draft, path)
    container.splice(path[path.length - 1], 1)
  })
