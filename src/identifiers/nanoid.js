// This is a modified variation of https://github.com/ai/nanoid, used under the MIT license.

// Cross-runtime buffer fill
let fill
let CRYPTO = globalThis.crypto
if (!CRYPTO) {
  ;(async () => {
    CRYPTO = await import('crypto')
    fill = size => CRYPTO.randomBytes(size)
  })()
} else {
  fill = size => CRYPTO.getRandomValues(new Uint8Array(size))
}

export default function NANOID (size = 21) {
  const bytes = fill(size)
  let id = ''

  while (size--) {
    const n = 63 & bytes[size]
    id += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? '_' : '-'
  }

  return id
}

export {
  NANOID
}
