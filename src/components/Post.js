import React from 'react';
import './Post.css';

const Post = ({ post, onClick, isGridView }) => {
  const handleClick = () => {
    onClick(post);
  };

  return (
    <div 
      className={`post-card ${isGridView ? 'grid-item' : 'list-item'}`}
      onClick={handleClick}
    >
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <span className="post-id">#{post.id}</span>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      <div className="post-actions">
        <span className="click-hint">Ver comentários</span>
      </div>
    </div>
  );
};

export default Post;
