'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; // Import the Image component from next/image
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const searchParams = useSearchParams();
  const refetch = searchParams.get('refetch');

  const fetchPosts = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const response = await fetch('/api/prompt', {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    const data = await response.json();
    console.log("Data: ", data);
    setTimeout(() => { // Add a delay to simulate fetching data
      setPosts(data);
      setLoading(false); // Set loading to false when fetching ends
    }, 1000); // Simulate a delay of 1 second
  };

  useEffect(() => {
    fetchPosts();
  }, [refetch]);

  console.log(posts);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const lowerSearchText = e.target.value.toLowerCase();
    const results = posts.filter(post => {
      const lowerPrompt = post.prompt.toLowerCase();
      const lowerTags = post.tag.toLowerCase();
      const lowerUsername = post.creator.username.toLowerCase();

      return (
        lowerPrompt.includes(lowerSearchText) ||
        lowerTags.includes(lowerSearchText) ||
        lowerUsername.includes(lowerSearchText)
      );
    });
    setFilteredPosts(results);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type='text'
          placeholder='Search for a prompt, tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {loading ? ( // Conditional rendering based on loading state
        <div className="flex justify-center items-center mt-10">
          <Image src="/assets/images/loading_gif.gif" alt="Loading..." width={50} height={50} />
        </div>
      ) : (
        searchText === '' ? (
          <PromptCardList data={posts} handleTagClick={() => { }} />
        ) : (
          <PromptCardList data={filteredPosts} handleTagClick={() => { }} />
        )
      )}
    </section>
  );
};

export default Feed;
