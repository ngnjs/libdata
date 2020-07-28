import { force as forceArray, dedupe } from './primitives/array.js'
import { force as forceBoolean } from './primitives/boolean.js'
import { force as forceNumber } from './primitives/number.js'
import * as AdvancedSet from './primitives/set.js'
import * as object from './primitives/object.js'
import * as operators from './operator.js'
import checksum from './checksum.js'
import GUID from './identifiers/guid.js'
import UUID from './identifiers/uuid.js'
import NANOID from './identifiers/nanoid.js'

const {
  typeOf,
  converge,
  nullIf,
  coalesce,
  coalesceb,
  getPrimitive
} = operators

export {
  dedupe,
  forceArray,
  forceBoolean,
  forceNumber,
  object,
  typeOf,
  converge,
  nullIf,
  coalesce,
  coalesceb,
  getPrimitive,
  AdvancedSet,
  GUID,
  UUID,
  NANOID,
  checksum
}
