import { UserContext } from "../contexts/UserContext";
import {useState, useEffect} from "react";
import LoginPage from "./login";
import PostFormCard from "../components/PostFormCard";
import PostCard from "../components/PostCard";
import { useSession, useSupabaseClient } from "@supabase/supabase-js";
import Layout from "../components/Layout";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const session = useSession();
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase.from("profiles").select().eq("id", session.user.id).then(result => {
      if (result.data.length){ 
        setProfile(result.data?.[0]);
     } 
    })
  },[session?.user?.id]);

  function fetchPosts() {
    supabase.from("posts").select("id,contenent,create_at,photos, profiles(id, avatar, name)")
    .is('parent',null)
    .order("created_at", {ascending: false})
    .then(result => {
      console.log('posts', result);
      setPosts(result.data);
    });
  }
  if (!session) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <UserContext.Provider value={{profile}}>  
        <PostFormCard onPost={fetchPosts} /> 
        {posts?.length > 0 && posts.map(post => (
          <PostCard key={post.id} {...post} />
          ))}
      </UserContext.Provider>
    </Layout>
  );  
}    