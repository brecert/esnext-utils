// @esnext use https://github.com/tc39/proposal-bind-operator
// @esnext use https://github.com/tc39/proposal-iterator-helpers

import { range, map, product } from './iterator.js'

export const comb = (n, k) =>
  range(1, k)
    ::map((i) => (n + 1 - i) / i)
    ::product()
