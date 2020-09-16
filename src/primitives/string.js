import { typeOf } from '../operator.js'

/**
 * @method forceString
 * Forces a value to become a string if it is not already one. For example:
 *
 * ```js
 * let x = NGN.forceString(false) // Boolean ==> String
 * console.log(x) // Outputs 'false'
 *
 * let y = NGN.forceString('text') // Already a String
 * console.log(y) // Outputs 'text'
 *
 * let z = NGN.forceString(0) // Number ==> String
 * console.log(z) // Outputs '0'
 * ```
 *
 * Dates are converted to their ISO string value.
 * Arrays are converted to a comma separated list.
 * Objects are converted to JSON.
 *
 * All unrecognized objects have their `toString()` method called.
 * If the object does not have this, the `NGN.typeOf` value is used with
 * an `unknown` prefix (i.e. `unknown-object`). This special `typeOf`
 * method will recognize class names, function names, and primitives.
 * @param {any} expression
 * The value being forced to be a boolean.
 * @private
 */
export function force (value) {
  if (value === null) {
    return 'null'
  }

  if (value === undefined) {
    return 'undefined'
  }

  switch (typeOf(value)) {
    case 'string':
      return value

    case 'boolean':
      return value ? 'true' : 'false'

    case 'date':
      return value.toISOString()

    case 'array':
      return value.join(',')

    case 'object':
      return JSON.stringify(value)

    default:
      if (value.name) {
        return value.name
      }

      if (!value.toString) {
        return `unknown-${typeOf(value)}`
      }

      return value.toString()
  }
}
