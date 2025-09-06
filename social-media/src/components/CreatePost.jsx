import React, { useRef } from 'react'
import { PostList } from '../store/Post-list-store';
import { useContext } from 'react';

const CreatePost = () => {
 const{addPost}=useContext(PostList);


 const userIdElement=useRef();
 const postTitleElement=useRef();
 const postBodyElement=useRef();
 const reactionsElement=useRef();
 const tagsElement=useRef();

 const handleOnSubmit=(event)=>{
  event.preventDefault();
  const userId=userIdElement.current.value;
  const postTitle=postTitleElement.current.value;
  const postBody=postBodyElement.current.value;
  const reactions=reactionsElement.current.value;
  const tags=tagsElement.current.value.split(' ');
  userIdElement.current.value="";
  postTitleElement.current.value="";
  postBodyElement.current.value="";
  reactionsElement.current.value="";
  tagsElement.current.value="";
  






  addPost(userId,postTitle,postBody,reactions,tags);

 }

  return (

    <form className='create-post' onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label" >User ID</label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control" 
          id="userId" 
          placeholder="Enter your User id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label" >Post Title</label>
        <input 
          type="text" 
          ref={postTitleElement}
          className="form-control" 
          id="title" 
          placeholder="how are feeling Today!"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label" >Caption</label>
        <textarea
          type="text" 
          ref={postBodyElement}
          rows="4"
          className="form-control" 
          id="body" 
          placeholder="Tell us more"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label" >Number</label>
        <input
        type='text'
        ref={reactionsElement}
        className="form-control" 
        id="reactions" 
        placeholder="Enter your lucky number or any number"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label" >HashTags</label>
        <input
        type='text'
        ref={tagsElement}
        className="form-control" 
        id="tags"
        />
      </div>
      
      
      <button type="submit" className="btn btn-primary">POST</button>
    </form>
  );
}

export default CreatePost;
