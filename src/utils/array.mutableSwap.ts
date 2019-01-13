export const mutableArraySwap = (
  arr: any[],
  aIndex: number,
  bIndex: number,
) => {
  ;[arr[aIndex], arr[bIndex]] = [arr[bIndex], arr[aIndex]]
}
