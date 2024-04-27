import PostCard from '../components/PostCard';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react ';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {UserContextProvider} from '../contexts/UserContext';  

export default function SavedPostPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(!session?.user?.id){
      return;
    }
    supabase
    .from('saved_posts')
    .select("post_id")
    .eq("user_id", session.user.id)
    .then(result => {
      const postIds = result.data.map(item => item.post_id);
      supabase
      from("posts")
      .select("*,profiles(*)").in("id", postIds)
      .then(result => setPosts(result.data));
      });
    },[session?.user?.id]);

    return(
      <Layout>
        <UserContextProvider>
          <h1 className="text-5xl mb-4 text-gray-300"> Saved post  </h1>
        
          {posts.length > 0 && posts.map(post => (
            <div key = {post.id}>
            <PostCard {...post} />
            </div>
          ))}
        </UserContextProvider>
      </Layout>
    );
  }

    