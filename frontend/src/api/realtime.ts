import { createClient } from '@supabase/supabase-js'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

const client = createClient(`${URL}`, `${KEY}`)

const channelA = client
.channel('room-1')
.on(
  'postgres_changes',
  {
    event: '*',
    schema: 'public',
  },
  (payload) => console.log(payload)
).subscribe()
