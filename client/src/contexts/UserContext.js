import {useSeccion, useSupabaseClient} from "@supabase/auth-helpers-aeact";
import {useEffect, useState, createContext } from "react";

export const UserContext = createContext({});

export default function UserProvider({children}) {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase.from('profiles').select().eq('id',session.user.id).then(result => {
      setProfile(result.data?.[0]);
    });
  },[session?.user?.id]);

  return (
    <UserContext.Provider value={{profile}}>
      {children}
    </UserContext.Provider>
  );
}