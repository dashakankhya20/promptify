"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";


import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const { id } = params;
    const router = useRouter();
    // console.log(id)
    // console.log(session?.user?.id)
    
    // console.log(posts)
    // console.log(session)
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method:'DELETE'
          });

          const filteredPosts = posts.filter((p) => 
          p._id !== post._id);
          setPosts(filteredPosts);
        }catch(error){
          console.log(error);
        }
      }
    }

    useEffect(() => {
        const fetchPosts = async () => {
          let userID;
          if(id){
            userID = id;
          }else{
            userID = session?.user?.id;
          }
          if(userID){
            const response = await fetch(`/api/users/${userID}/posts`);
            const data = await response.json();
      
            setPosts(data);
          }
        }

        fetchPosts();
      }, []);
      //console.log(posts)
      //console.log(session?.user?.id === id)
  return (
    <>
    {session?.user?.id ? (
      <Profile 
      name={session?.user?.id === id ? "My" : posts[0]?.creator?.username}
      desc={session?.user?.id === id ? "Welcome to your personalized profile" : ""}
      data={posts}
      handleEdit={session?.user?.id === id && handleEdit}
      handleDelete={session?.user?.id === id && handleDelete}
  />
  ) : (
    <div>
      Please sign in to view your profile
    </div>
  )}
  </>
  
  )
}

export default MyProfile;