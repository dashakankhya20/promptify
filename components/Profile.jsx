'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component from next/image
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [posts, setPosts] = useState(data); // Initialize posts state with data

  useEffect(() => {
    // Simulate fetching data with a timeout
    setTimeout(() => {
      setPosts(data);
      setLoading(false); // Set loading to false when fetching ends
    }, 1000); // Simulate a delay
  }, [data]); // Run effect when data changes

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {loading ? ( // Conditional rendering based on loading state
        <div className="mt-10 flex justify-center items-center"> {/* Added mt-10 for top margin */}
          <Image src="/assets/images/loading_gif.gif" alt="Loading..." width={50} height={50} />
        </div>
      ) : (
        <div className='mt-10 prompt_layout'>
          {posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Profile;
