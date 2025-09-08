import React, { useRef, useContext } from "react";
import { PostList } from "../store/Post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate=useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const tagsElement = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const userId = parseInt(userIdElement.current.value, 10); // must be number
    const postTitle = postTitleElement.current.value.trim();
    const postBody = postBodyElement.current.value.trim();
    const tags = tagsElement.current.value
      .split(" ")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!userId || !postTitle) {
      alert("User ID and Title are required!");
      return;
    }

    // Build payload
    const payload = {
      title: postTitle,
      userId,
    };
    if (postBody) payload.body = postBody;
    if (tags.length) payload.tags = tags;

    try {
      const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      const post = await res.json();
      addPost(post);
      navigate("/");

      // reset form
      userIdElement.current.value = "";
      postTitleElement.current.value = "";
      postBodyElement.current.value = "";
      tagsElement.current.value = "";
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <form className="create-post" onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">User ID</label>
        <input
          type="number"
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="Enter user id (any number between 1 to 100)"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Post Title</label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="What's on your mind?"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">Caption</label>
        <textarea
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">HashTags</label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="#fun #life #travel"
        />
      </div>

      <button type="submit" className="btn btn-primary">POST</button>
    </form>
  );
};

export default CreatePost;
