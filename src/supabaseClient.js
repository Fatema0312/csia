import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jgtgeftxtodghezcmupk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpndGdlZnR4dG9kZ2hlemNtdXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MjIwMjAsImV4cCI6MjA0OTI5ODAyMH0.tI4EA55CD9odgp_5SkS3A85xQ1mcYbntY71GufYQkQI'

export const supabase = createClient(supabaseUrl, supabaseKey)