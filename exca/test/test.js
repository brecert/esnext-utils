import { repeatedCombinations, repeatedPermutations } from 'esnext-utils/algorithm.js'
import { collect, range } from 'esnext-utils/iterator.js'
import { comb } from 'esnext-utils/math.js'
import { dbg } from 'esnext-utils/util.js'
import './binop.js'


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