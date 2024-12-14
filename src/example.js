import { supabase } from './supabaseClient'

// Example of how to query data
async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log('Books:', data)
}