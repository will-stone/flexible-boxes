import jsurl from 'jsurl'
import { IBox } from '../model'

export const boxesToString = (boxes: IBox[]) => jsurl.stringify(boxes)
