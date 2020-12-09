# esnext-utils
utils made with esnext proposals in mind

todo: create runtime babel tool for using plugins dynamically with the esnext pragma

## Example

Given the import map

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

comb(5, 3);
// 10

['iced', 'jam', 'plain']::repeatedCombinations(2);
// [
//   [ 'plain', 'plain' ],
//   [ 'plain', 'jam' ],
//   [ 'jam', 'jam' ],
//   [ 'plain', 'iced' ],
//   [ 'jam', 'iced' ],
//   [ 'iced', 'iced' ]
// ]

range(1, 3)::repeatedPermutations(2)::collect();
// [
//   [ 1, 1 ], [ 1, 2 ],
//   [ 1, 3 ], [ 2, 1 ],
//   [ 2, 2 ], [ 2, 3 ],
//   [ 3, 1 ], [ 3, 2 ],
//   [ 3, 3 ]
// ]

combinationsN(5, 3)::collect();
// [
//   [ 0, 1, 2 ], [ 0, 1, 3 ],
//   [ 0, 1, 4 ], [ 0, 2, 3 ],
//   [ 0, 2, 4 ], [ 0, 3, 4 ],
//   [ 1, 2, 3 ], [ 1, 2, 4 ],
//   [ 1, 3, 4 ], [ 2, 3, 4 ]
// ]
```
