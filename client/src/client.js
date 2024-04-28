import { createClient } from '@supabase/supabase-js'


const URL = process.env.REACT_APP_SUPABASE_URL
//"https://aepdknvadsqojtqwaimk.supabase.co"

const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlcGRrbnZhZHNxb2p0cXdhaW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzQxNTMsImV4cCI6MjAyOTgxMDE1M30.k3Ecfluxnlrq9q2op9jN0KOmIS_4gbxmXNOg1lMXnJo"
//process.env.REACT_APP_SUPABASE_ANON_KEY 


const supabase = createClient(URL, API_KEY);

 export default supabase;



 