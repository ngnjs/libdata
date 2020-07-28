/**
 * Indicates the subset is wholly contained within the main set.
 * @param  {Set}  mainset
 * @param  {Set}  subset
 * @return {Boolean}
 */
function isSuperSet (mainset, subset) {
  if (subset.size > mainset.size || subset.size === 0) {
    return false
  }

  for (const element of subset.values()) {
    if (!mainset.has(element)) {
      return false
    }
  }

  return true
}

/**
 * Join/merge any number of sets together into a single aggregate set.
 * Only unique values will be added. Accepts any number of Set arguments.
 * @return {Set}
 */
function concat () {
  const args = Array.from(arguments)
  return new Set(function * () {
    while (args.length > 0) {
      yield * args.shift()
    }
  }())
}

/**
 * Identify the intersection/overlap between sets.
 * 
 * @example
 * ```
 * const megaSet = intersectAll(setA, setB, setC, setD)
 * ```
 * @param  {Set} set
 * Accepts any number of sets
 * @return {Set}
 * Returns a Set containing the common elements of setA and setB.
 */
function intersection () {
  switch (arguments.length) {
    case 0:
      return new Set()
    case 1:
      return arguments[0]
  }

  const mega = concat(...arguments)
  for (const arg of arguments) {
    for (const value of mega) {
      if (!arg.has(value)) {
        mega.delete(value)
      }
    }
  }

  return mega
}

/**
 * Identify the elements of set A that are NOT part of other sets.
 * 
 * _Example_
 * ```
 * const all = new Set(['a', 'b', 'c', 'd', 'e'])
 * const b = new Set(['b'])
 * const c = new Set(['c', 'd'])
 * const result = except(all, b, c)
 * // Result is Set{a, e}
 * ```
 * @param  {Set} setA
 * @param  {Set} setB
 * @return {Set}
 * Returns a set containing elements that are NOT common between sets.
 */
function except (setA) {
  const args = Array.from(arguments).slice(1)
  const base = new Set(setA)
  args.forEach(val => val.forEach(v => base.delete(v)))
  return base
}

/**
 * Identify the elements that are NOT part of **both** sets. This is the symmetric
 * difference between sets (inverse of intersection).
 * @param  {Set} setA
 * @param  {Set} setB
 * @return {Set}
 * Returns a set containing elements that are NOT common between setA and setB.
 */
function diff (setA, setB) {
  const difference = new Set(setA)

  for (const el of setB) {
    if (difference.has(el)) {
      difference.delete(el)
    } else {
      difference.add(el)
    }
  }

  return difference
}

/**
 * Determines whether sets contain the same values.
 * This will accept any number of sets, but must have at least 2.
 * @param  {Set} setA
 * @param  {Set} setB
 * @return {Boolean}
 */
function equal () {
  const args = Array.from(arguments)
  const base = args.shift()
  for (const val of args) {
    if (except(base, val).size > 0) {
      return false
    }
  }

  return true
}

/**
 * A convenience method for applying these utility methods to
 * the Set prototype, where the first argument of
 * each method automatically refers to the base Set.
 * 
 * This allows developers to use functions directly from the invoked Set object.
 * 
 * _Example:_
 * ```
 * const demo = new Set(['a', 'b', 'c'])
 * const extra = new Set(['d', 'e'])
 * const f = new Set(['f])
 * const result = demo.concat(extra, f)
 * console.log(result)
 * // Outputs Set{a, b, c, d, e, f}
 * ```
 * 
 * **Notice:** isSuperSet is replaced by two methods, which are more readable:
 * 
 * 1. isSupersetOf(setB)
 * 1. isSubsetOf(setB)
 * 
 * These are used as:
 * 
 * ```
 * const a = new Set(['a', 'b', 'c', 'd', 'e'])
 * const b = new Set(['a', 'b', 'c'])
 * console.log(a.isSupersetOf(b)) // true
 * console.log(a.isSubsetOf(b)) // false
 * ```
 * 
 * @warning Adding methods to native prototypes can be risky.
 * If native JavaScript functionality changes, it is possible
 * these methods will conflict with future native functions. However;
 * this approach is advocated in the [Set documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) on MDN.
 */
function polyfill () {
  Set.prototype.isSubsetOf = function (subset) { return isSuperSet(subset, this) } // eslint-disable-line no-extend-native
  Set.prototype.isSupersetOf = function (subset) { return isSuperSet(this, subset) } // eslint-disable-line no-extend-native
  Set.prototype.intersection = function () { return intersection(this, ...arguments) } // eslint-disable-line no-extend-native
  Set.prototype.except = function () { return except(this, ...arguments) } // eslint-disable-line no-extend-native
  Set.prototype.diff = function (compare) { return diff(this, compare) } // eslint-disable-line no-extend-native
  Set.prototype.equal = function () { return equal(this, ...arguments) } // eslint-disable-line no-extend-native
  Set.prototype.concat = function () { return concat(this, ...arguments) } // eslint-disable-line no-extend-native
}

export {
  isSuperSet,
  concat,
  intersection,
  diff,
  except,
  equal,
  polyfill
}
