import test from 'tappedout'
import { AdvancedSet } from '@ngnjs/libdata'

const {
  isSuperSet,
  concat,
  intersection,
  diff,
  except,
  equal,
  polyfill
} = AdvancedSet

test('Advanced Set: isSuperSet', t => {
  const a = new Set(['a', 'b', 'c', 'd', 'e'])
  const b = new Set(['a', 'b', 'c'])

  t.expect(true, isSuperSet(a, b), 'Superset identified')
  t.expect(false, isSuperSet(b, a), 'Superset identified')
  t.end()
})

test('Advanced Set: concat', t => {
  const a = new Set(['a', 'b'])
  const b = new Set(['c', 'd'])
  const c = new Set(['e'])
  const r = concat(a, b, c)

  t.expect(5, r.size, 'Concatenated everything together.')
  t.end()
})

test('Advanced Set: intersection', t => {
  const a = new Set(['a', 'b', 'e'])
  const b = new Set(['c', 'd', 'e'])
  const c = new Set(['a', 'c', 'e'])
  const d = new Set(['x'])

  t.expect(2, intersection(a, c).size, 'Intersection between two sets.')
  t.expect(1, intersection(a, b, c).size, 'Intersection between multiple sets.')
  t.expect(0, intersection(a, b, d).size, 'Intersection with no commonalities yields empty result.')
  t.end()
})

test('Advanced Set: except', t => {
  const all = new Set(['a', 'b', 'c', 'd', 'e'])
  const b = new Set(['b'])
  const c = new Set(['c', 'd'])

  t.expect(2, except(all, b, c).size, 'Removes exceptions from set.')
  t.end()
})

test('Advanced Set: diff', t => {
  const a = new Set(['a', 'b', 'e'])
  const b = new Set(['c', 'd', 'e'])

  t.expect(4, diff(a, b).size, 'Identifies the elements which are not shared between sets.')
  t.end()
})

test('Advanced Set: equal', t => {
  const a = new Set(['a', 'b', 'e'])
  const b = new Set(['c', 'd', 'e'])
  const c = new Set(['a', 'b', 'e'])

  t.expect(true, equal(a, a, c), 'Recognizes all sets to contain the same values.')
  t.expect(false, equal(a, b), 'Recognizes when sets are not the same.')
  t.end()
})

test('Advanced Set: polyfill', t => {
  polyfill()

  const a = new Set(['a', 'b', 'c', 'd', 'e'])
  const b = new Set(['a', 'b', 'c'])
  const c = new Set(['d', 'e'])
  const f = new Set(['f'])

  t.expect('function', typeof a.isSupersetOf, 'isSupersetOf method exists.')
  t.expect('function', typeof a.isSubsetOf, 'isSubsetOf method exists.')
  t.expect(true, a.isSupersetOf(b), 'Superset identified')
  t.expect(false, b.isSupersetOf(a), 'Non-superset identified')
  t.expect(true, b.isSubsetOf(a), 'Subset identified')
  t.expect(false, a.isSubsetOf(b), 'Non-subset identified')
  t.expect(5, b.concat(c).size, 'Concatenating 2 Sets work.')
  t.expect(6, b.concat(a, c, f).size, 'Concatenating multiple Sets work.')
  t.expect(3, a.intersection(b).size, 'Intersection recognized between Sets.')
  t.expect(2, a.except(b).size, 'Exceptions are filtered out of base Set.')
  t.expect(3, a.diff(new Set([...b, ...new Set('x')])).size, 'Difference recognizes what is unique in each set.')
  t.expect(true, a.equal(a, a), 'Equal sets are recognized.')
  t.expect(false, a.equal(b), 'Unequal sets are recognized.')
  t.end()
})
