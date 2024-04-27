import TimeAgo from 'javascript-time-ago';
import { useState } from 'react';
import {SessionContextProvider} from '@supabase/auth-helpers-react';
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-react';
import '../styles/globals.css';
import en from 'javascript-time-ago'; 

TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }) {
  const [useSupabaseClient] = useState(() => createBrowserSupabaseClient( ));

  return (
    <SessionContextProvider supabaseClient= {supabaseClient}
    initialSession = {pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
export default MyApp;
