import _ from 'lodash'

export function getBoxAt(boxes, path) {
  if (_.isEmpty(path)) {
    return boxes
  }

  if (!boxes.c) {
    throw new Error('Corrupt path: box does not have children')
  }

  if (!boxes.c[path[0]]) {
    throw new Error('Corrupt path: child does not exist')
  }

  return getBoxAt(boxes.c[path[0]], _.tail(path))
}
