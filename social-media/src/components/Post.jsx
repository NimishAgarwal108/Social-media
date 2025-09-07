import React, { useContext } from 'react';
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/Post-list-store";

function Post({post}) {
  const {deletePost}=useContext(PostList);
  return (
    <div className="card  post-card" >
  <div className="card-body">
    <h5 className="card-title">{post.title}
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>deletePost(post.id)}>
   <MdDelete />
   
  </span>
    </h5>
    <p className="card-text">{post.body}</p>
    {post.tags.map((tag)=>(<span key={tag} className="badge rounded-pill text-bg-primary tag-btn">{tag}</span>))}
    </div>
    <div className="alert alert-success reactions" role="alert">
     {post.reactions.likes + post.reactions.dislikes} people reacted to your post!
  </div>
</div>
    
  );
}

export default Post;