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
