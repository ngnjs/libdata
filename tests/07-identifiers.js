import test from 'tappedout'
import { GUID, UUID, NANOID } from '@ngnjs/libdata'

test('Identifier: GUID', t => {
  const id = GUID()
  t.expect(36, id.length, 'Returns unique string of proper length.')
  t.end()
})

test('Identifier: UUID', t => {
  const id = UUID()
  t.expect(36, id.length, 'Returns unique string of proper length.')
  t.end()
})

test('Identifier: NANOID', t => {
  t.expect(2, NANOID(2).length, 'Returns unique string of proper length. (small size)')
  t.expect(15, NANOID(15).length, 'Returns unique string of proper length. (avg size)')
  t.expect(36, NANOID(36).length, 'Returns unique string of proper length. (large size)')
  t.end()
})
