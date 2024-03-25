import { createClient } from '@supabase/supabase-js'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

const clientA = createClient(`${URL}`, `${KEY}`)

// Join a room/topic. Can be anything except for 'realtime'.
const channelA = clientA.channel('room-1')

// Simple function to log any messages we receive
function messageReceived(payload : any) {
  console.log(payload)
}

// Subscribe to the Channel
channelA.on('broadcast', { event: 'test' }, (payload) => messageReceived(payload)).subscribe()

const channelB = clientA.channel('room-1')

channelB.subscribe((status) => {
  // Wait for successful connection
  if (status !== 'SUBSCRIBED') {
    return null
  }

  // Send a message once the client is subscribed
  channelB.send({
    type: 'broadcast',
    event: 'test',
    payload: { message: 'hello, world' },
  })
})