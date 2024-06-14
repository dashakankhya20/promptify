"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async(e) => {
    // to prevent the default behaviour of the browser reloading while the
    //form is submitted
    e.preventDefault();
    setSubmitting(true);
    //creating the new endpoint to post the data 
    try{
      const response = await fetch('/api/prompt/new', {
        method:'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })
  // going to the front home page if everything is ok
      if(response.ok){
        router.push('/');
      }
    }catch(error){
      console.error(error);
    }finally{
      setSubmitting(false);
    }
  }
  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt