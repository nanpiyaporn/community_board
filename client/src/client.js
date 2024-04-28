import { createClient } from '@supabase/supabase-js'


const URL = process.env.REACT_PUBLIC_SUPABASE_URL


const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY


const supabase = createClient(URL, API_KEY);

 export default supabase;