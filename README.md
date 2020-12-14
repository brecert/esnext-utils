# esnext-utils
utils made with esnext proposals in mind

todo: create runtime babel tool for using plugins dynamically with the esnext pragma

## Example

While using [exca](exca/package.json) and given the following import map.

```json
{
  "imports": {
    "esnext-utils/": "https://raw.githubusercontent.com/Brecert/esnext-utils/main/src/"
  }
}
```

Then

```js
// @esnext use https://github.com/tc39/proposal-bind-operator
// @esnext use https://github.com/tc39/proposal-iterator-helpers

import { repeatedCombinations, repeatedPermutations } from 'esnext-utils/algorithm.js'
import { collect, range } from 'esnext-utils/iterator.js'
import { comb } from 'esnext-utils/math.js'
import { dbg } from 'esnext-utils/util.js'


comb(5, 3);
// 10

['iced', 'jam', 'plain']::repeatedCombinations(2)::dbg();
// [
//   [ 'plain', 'plain' ],
//   [ 'plain', 'jam' ],
//   [ 'jam', 'jam' ],
//   [ 'plain', 'iced' ],
//   [ 'jam', 'iced' ],
//   [ 'iced', 'iced' ]
// ]

range(1, 3)::repeatedPermutations(2)::collect()::dbg();
// [
//   [ 1, 1 ], [ 1, 2 ],
//   [ 1, 3 ], [ 2, 1 ],
//   [ 2, 2 ], [ 2, 3 ],
//   [ 3, 1 ], [ 3, 2 ],
//   [ 3, 3 ]
// ]
```
