// @esnext use https://github.com/tc39/proposal-bind-operator
// @esnext use https://github.com/tc39/proposal-iterator-helpers

import { clone } from './iterator.js'

export function* repeatedPermutations(n) {
  let pool = Array.from(this);
  for (let el of pool) {
    if (n !== 1) {
      for (let perm of pool::repeatedPermutations(n - 1)) {
        yield [el, perm];
      }
    } else {
      yield el;
    }
  }
}

export function repeatedCombinations(n) {
  if (n === 0) return [[]];
  if (this.length === 0) return [];

  let head = this.slice(1)::repeatedCombinations(n);

  for (let comb of this::repeatedCombinations(n - 1)) {
    head = [...head, [...comb, this[0]]];
  }

  return head;
}

export function* combinationsN(n, p) {
  if (p === 0) {
    return [[]];
  }
  let i = 0;
  const combo = [];
  while (combo.length < p) {
    if (i < n) {
      combo.push(i);
      i += 1;
    } else {
      if (combo.length === 0) {
        break;
      }
      i = combo.pop() + 1;
    }

    if (combo.length === p) {
      yield combo::clone();
      i = combo.pop() + 1;
    }
  }
}
