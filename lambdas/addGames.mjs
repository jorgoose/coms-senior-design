import { createClient } from '@supabase/supabase-js';

export async function handler(event) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let steamData = event.steamData;

  // Test data - replace with dynamic data as needed
  const gameData = steamData.games;
    
  const { data, error } = await supabase
  .from('Games')
  .insert(gameData)
  .select()

  if (error) {
    console.error('Error updating user data:', error);
    return { statusCode: 500, body: 'Failed to update user data' };
  }

  console.log('User data updated successfully:', data);
  return { statusCode: 200, body: JSON.stringify(data) };
}

//this expects the following json...probably going to tweak in future
// {
//   "steamData": {
//     "games": [
//       {
//         "title": "TestEvent1",
//         "developer": "testDev1"
//       },
//       {
//         "title": "TestEvent2",
//         "developer": "testDev2"
//       }
//     ]
//   }
// }
