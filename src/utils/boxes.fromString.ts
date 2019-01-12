import jsurl from 'jsurl'
import { IBox } from '../model'

export const boxesFromString = (str: string) => jsurl.parse(str)
