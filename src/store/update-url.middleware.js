import jsurl from 'jsurl'

/**
 * Update the URL hash when the box configuration changes
 */
export const updateUrlMiddleware = () => (store) => (next) => (action) => {
  /**
   * Move to next middleware
   */
  const result = next(action)

  window.location.hash = jsurl.stringify(store.getState().ui.boxes)

  return result
}
