import { createClient } from '@supabase/supabase-js'


const URL = 'https://wrvhmflqmmfbywunmckm.supabase.co'


const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY


const supabase = createClient(URL, API_KEY);

 export default supabase;