/**
 * Does nothing
 */
export function noop() {}

/**
 * Returns a function that returns val
 * @param val the value to return
 * @returns {Function} function that returns val
 */
export function returns(val) {
  return () => val;
}
