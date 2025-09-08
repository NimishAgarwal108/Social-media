import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/Post-list-store";

function Post({ post }) {
  const { deletePost } = useContext(PostList);

  // Safe defaults
  const reactions = post.reactions || { likes: 0, dislikes: 0 };
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
            style={{ cursor: "pointer" }}
          >
            <MdDelete />
          </span>
        </h5>

        <p className="card-text">{post.body}</p>

        {tags.map((tag, index) => (
          <span key={index} className="badge rounded-pill text-bg-primary me-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="alert alert-success reactions" role="alert">
        {reactions.likes + reactions.dislikes} people reacted to your post!
      </div>
    </div>
  );
}

export default Post;
