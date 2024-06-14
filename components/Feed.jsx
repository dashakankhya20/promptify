'use client';

import { useState, useEffect } from 'react'
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
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      });

      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const lowerSearchText = e.target.value.toLowerCase();
    // console.log(lowerSearchText);
    // console.log(posts);
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
  }


  console.log(posts)

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
        {/* {console.log(searchText)} */}
      </form>

      {/* Conditional rendering of PromptCardList */}
      {searchText === '' ? (
        <PromptCardList data={posts} handleTagClick={() => { }} />
      ) : (
        <PromptCardList data={filteredPosts} handleTagClick={() => { }} />
      )}
    </section>
  )
}

export default Feed