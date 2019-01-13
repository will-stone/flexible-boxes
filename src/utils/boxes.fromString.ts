import jsurl from 'jsurl'
import { IBox } from '../model'

export const boxesFromString = (str: string): IBox[] => {
  try {
    const parsed = jsurl.parse(str)
    return parsed
  } catch (err) {
    throw new Error(err)
  }
}
