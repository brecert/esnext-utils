// @esnext use https://github.com/tc39/proposal-bind-operator
// @esnext use https://github.com/tc39/proposal-iterator-helpers

const {
  map,
  take,
  filter,
  drop,
  asIndexedPairs,
  flatMap,
  reduce,
  toArray,
  forEach,
  some,
  every,
  find,
} = Iterator.prototype;

// todo: use metadata to store iterator size, and estimated size for performance

export function* range(min, max) {
  for (let i = min; i <= max; i++) {
    yield i;
  }
}

export function* chain(iter) {
  yield* this;
  yield* iter;
}

export function collect() {
  return Array.from(this);
}

export function clone() {
  return Array.from(this);
}

export function count() {
  return this::collect().length;
}


// https://gist.github.com/jed/cc1e949419d42e2cb26d7f2e1645864d
export function tee(iterable) {
  let source = iterable[Symbol.iterator]();

  return [[], []].map((buffer, i, buffers) => ({
    next() {
      if (0 in buffer) return buffer.shift();

      let item = source.next();

      if (!item.done) buffers[1 - i].push(item);

      return item;
    },

    [Symbol.iterator]() {
      return this;
    },
  }));
}

export function* cycle() {
  const saved = [];
  for (const element of this) {
    yield element;
    saved.push(element);
  }

  while (saved.length > 0) {
    for (const element of saved) {
      yield element;
    }
  }
}

export function enumerate() {
  return this.asIndexedPairs();
}

export function* filterMap(fn) {
  this.map(fn).filter((n) => n);
}

export function flatten(fn) {
  this.flatMap((a) => a);
}

// todo: use drop for perf?
export function* stepBy(n) {
  let i = 0;
  for (let next of this) {
    if (i % n === 0) {
      yield next;
    }
    i += 1;
  }
}

export function sum() {
  return this.reduce((a, b) => a + b);
}

export function product() {
  return this.reduce((a, b) => a * b);
}

export function* takeWhile(fn) {
  for (let next of this) {
    if (!fn(next)) {
      break;
    }
    yield next;
  }
}

export function* repeat(value) {
  while (true) yield value;
}

// todo: allow arrays
export function* zip(other) {
  let nextSelf = this.next();
  let nextOther = other.next();

  while (!nextSelf.done || !nextOther.done) {
    yield [nextSelf.value, nextOther.value];
    nextSelf = this.next();
    nextOther = other.next();
  }
}
