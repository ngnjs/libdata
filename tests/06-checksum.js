import test from 'tappedout'
import { checksum } from '@ngnjs/libdata'

test('Sanity', t => {
  const data = {
    a: 1,
    b: true,
    c: 'three'
  }

  t.expect('1627578237', checksum(data), 'Checksum validated.')
  t.end()
})
