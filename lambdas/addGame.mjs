import { createClient } from '@supabase/supabase-js';

// Need to implement a package.json and package-lock whereever this is deploying

export async function handler(event) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const gameData = {
    title: 'testGame',
    developer: 'testGameDev'
  };
    
  const { data, error } = await supabase
  .from('Games')
  .insert([
    { 
      title: gameData.title,
      developer: gameData.developer
    }
  ])
  .select()

  if (error) {
    console.error('Error updating user data:', error);
    return { statusCode: 500, body: 'Failed to update user data' };
  }

  console.log('User data updated successfully:', data);
  return { statusCode: 200, body: JSON.stringify(data) };
}
