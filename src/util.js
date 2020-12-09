/**
 * modify a value in place
 */
export function modify(fn) {
  return fn(this)
}

// todo: use import.meta for extra info
export function dbg() {
  console.log(this)
  return this
}
