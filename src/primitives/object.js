import { typeOf } from '../operator.js'
import { equal, except, diff } from './set.js'

/**
 * @method all
 * Determines whether the specified object has _all_ of the provided properties.
 * This only accounts for enumerable properties. It also decorates the Boolean
 * result with a property called `properties`, which contains any missing property
 * names.
 *
 * **Example**
 * ```js
 * let check = all(NGN, 'BUS', 'NET')
 *
 * console.log(check) // Outputs: true
 * ```
 *
 * ```js
 * let check = all(NGN, 'BUS', 'NET', 'JUNK')
 *
 * console.log(check) // Outputs: false
 * console.log(check.properties) // Outputs ['JUNK']
 * ```js
 * @param {Object} object
 * The object to check.
 * @return {Boolean}
 */
function all () {
  const properties = new Set(Object.keys(arguments[0]))

  for (let i = 1; i < arguments.length; i++) {
    if (!properties.has(arguments[i])) {
      return false
    }
  }

  return true
}

/**
 * @method any
 * Determines whether the specified object has _any_ of the requested properties.
 * This only accounts for enumerable properties.
 *
 * **Example**
 * ```js
 * let check = any(NGN, 'BUS', 'NET', 'MORE')
 *
 * console.log(check) // Outputs: true
 * ```
 *
 * ```js
 * let check = any(NGN, 'JUNK1', 'JUNK2', 'JUNK3')
 *
 * console.log(check) // Outputs: false
 * ```js
 * @param {Object} object
 * The object to check.
 * @return {Boolean}
 */
function any () {
  const properties = new Set(Object.keys(arguments[0]))

  for (let i = 1; i < arguments.length; i++) {
    if (properties.has(arguments[i])) {
      return true
    }
  }

  return false
}

/**
 * @method missing
 * Given a list, returns which list items are not present in an
 * object's enumerable properties.
 *
 * ```js
 * let obj = { a: 1, b: 2 }
 * let missing = missing(obj, 'a', 'b', 'c')
 *
 * console.log(missing) // Outputs ['c']
 * ```
 * @param {Object} object
 * The object to check.
 * @return {String[]}
 * @private
 */
function missing () {
  const properties = new Set(Object.keys(arguments[0]))
  return Array.from(diff(properties, new Set(Array.from(arguments).slice(1))))
}

/**
 * @method exactly
 * Determines whether the specified object has _only_ the requested properties.
 * This only accounts for enumerable properties.
 *
 * **Example**
 * ```js
 * let obj = { a: 1, b: 2 }
 * let check = exactly(obj, 'a', 'b')
 *
 * console.log(check) // Outputs: true
 * ```
 *
 * ```js
 * let obj = { a: 1, b: 2, d: 4 }
 * let check = exactly(obj, 'a', 'b', 'c')
 *
 * console.log(check) // Outputs: false
 * ```js
 * @param {Object} object
 * The object to check.
 * @return {Boolean}
 */
function exactly () {
  const properties = new Set(Object.keys(arguments[0]))
  const args = new Set(Array.from(arguments).slice(1))
  return equal(properties, args)
}

/**
 * @method extraneous
 * Given a list, returns which enumerable object properties
 * are not in the list.
 *
 * ```js
 * let obj = { a: 1, b: 2, d: 4 }
 * let extra = extraneous(obj, 'a', 'b', 'c')
 *
 * console.log(extra) // Outputs ['d']
 * ```
 * @param {Object} object
 * The object to check.
 * @return {String[]}
 * @private
 */
function extraneous () {
  const extras = new Set(Object.keys(arguments[0]))
  return Array.from(except(extras, new Set(Array.from(arguments).slice(1))))
}

/**
 * @method require
 * This is the same as #all, but will throw an
 * error if the object is missing any properties.
 * @throws Error
 */
function require () {
  if (!all(...arguments)) {
    throw new Error(`${arguments[0].constructor.name} is missing the following attributes: ${missing(...arguments).join(', ')}`)
  }
}

/**
 * @method mixin
 * Inherit the properties of another object/class. Includes non-enumerable
 * properties and symbols.
 * @param  {object|function} source
 * The source object (i.e. what gets copied)
 * @param  {object|function} destination
 * The object properties get copied to.
 * @param {boolean|function} [overwrite=true]
 * Determines whether the source attribute will overwrite the destination
 * attribute when a naming conflict occurs. This must be a boolean value or
 * a function which returns a boolean value. The function receives two arguments,
 * the name of the attribute and it's definition.
 *
 * Example:
 * ```
 * object.mixin(source, dest, function (name, definition) {
 *   if (name === 'ignoreme' || !definition.enumerable) {
 *     return false
 *   } else {
 *     return true
 *   }
 * })
 * ```
 */
function mixin (source = null, dest = null, overwrite = true) {
  const owfn = typeof overwrite === 'function'
  const ow = typeof overwrite === 'boolean' ? overwrite : false

  if (source && dest) {
    source = typeof source === 'function' ? source.prototype : source
    dest = typeof dest === 'function' ? dest.prototype : dest

    Object.getOwnPropertyNames(source).forEach(function (attr) {
      const definition = Object.getOwnPropertyDescriptor(source, attr)
      if (dest[attr] === undefined || (ow || (owfn && overwrite(attr, definition)))) {
        Object.defineProperty(dest, attr, definition)
      }
    })

    const prototype = Object.getOwnPropertyNames(Object.getPrototypeOf(source)).filter((attr) => {
      return attr.trim().toLowerCase() !== 'constructor' && dest[attr] === undefined // eslint-disable-line no-prototype-builtins
    })

    prototype.forEach(attr => {
      const cfg = Object.getOwnPropertyDescriptor(source, attr)

      if (cfg === undefined && typeof source[attr] === 'function') {
        Object.defineProperty(dest, attr, {
          get () {
            return source[attr].apply(this, arguments)
          }
        })
      }
    })

    Object.getOwnPropertySymbols(source).forEach(s => { dest[s] = source[s] })
  }
}

// An internal helper method for the serialize method
const serializeArray = data => typeof data === 'object' ? serialize(data) : data

/**
 * @method serialize
 * Creates a JSON data object. _This differs from a JavaScript object._
 * Remember, JSON is a _text **format**_, not an enriched object. The output
 * of this method will contain no functions, setters, regular
 * expressions, date objects, sets, or maps. Complex data types, including
 * getters, are converted to strings and numbers.
 *
 * Functions & Setters are always ignored. Getters are evaluated recursively
 * until a simple object type is found or there are no further nested
 * attributes.
 * @param {object|array} object
 * Supports an object or array.
 * @returns {object|array}
 * The results of this method can safely be stored as a JSON file.
 */
function serialize (data) {
  const type = typeOf(data)

  if (typeof data !== 'object') {
    throw new Error(`Cannot serialize ${type} value (must be an object).`)
  }

  if (type === 'array') {
    return data.map(serializeArray)
  }

  const result = {}

  for (const [attr, value] of Object.entries(data)) {
    if (value !== undefined) {
      switch (typeOf(value)) {
        case 'object':
          result[attr] = serialize(value)
          break
        case 'array':
          result[attr] = value.map(serializeArray)
          break
        case 'date':
          result[attr] = value.toISOString()
          break
        case 'symbol':
          result[attr] = value.toString()
          break
        case 'regexp':
          result[attr] = value.toString()
          break
        case 'weakmap':
        case 'map':
          result[attr] = serialize(Object.fromEntries(value))
          break
        case 'weakset':
        case 'set':
          result[attr] = Array.from(value)
          break
        case 'function':
          break
        default:
          result[attr] = value
      }
    }
  }

  return result
}

export {
  all,
  any,
  exactly,
  require,
  extraneous,
  missing,
  mixin,
  serialize
}
