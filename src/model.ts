export interface IBox {
  c?: IBox[]
  t?: string
  d?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  w?: 'nowrap' | 'wrap' | 'wrap-reverse'
  g?: number
  s?: number
  b?: string
  ac?: string
  ai?: string
  as?: string
  jc?: string
  js?: string
}
