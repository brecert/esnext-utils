export function* lines() {
  yield* this.split('\n')
}
