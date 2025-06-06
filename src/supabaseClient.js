import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLIC_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase URL:', supabase);
// console.log('Supabase Key:', supabaseAnonKey ? 'Loaded' : 'Missing');


export default supabase;
