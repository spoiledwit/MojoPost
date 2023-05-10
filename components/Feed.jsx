'use client'

import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagCick}) => {
  return(
    <div className='mt-16 prompt_layout'> 
      {data.map((post)=>{
      return (
       <PromptCard
       post={post}
       handleTagClick={handleTagCick}
       />
      )
      })}
    </div>
  )
}

const Feed = () => {

 const [posts, setPosts] = useState([]);
 const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
      setSearchText(e.target.value);
  }

  useEffect(()=>{
    const fetchPost = async() => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    }
    fetchPost();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type="text"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagCick={()=>{}}
        />
    </section>
  )
}

export default Feed