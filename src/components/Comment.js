import React, { useState } from 'react';
import './Comment.css';

const Comment = ({ comment, onDelete, isGridView }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getDisplayName = (fullName) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0]} ${names[names.length - 1]}`;
    }
    return fullName;
  };

  const getDisplayEmail = (email) => {
    const username = email.split('@')[0];
    return `@${username}`;
  };

  const truncateText = (text, maxLength = 140) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    onDelete(comment.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`comment-card ${isGridView ? 'grid-item' : 'list-item'}`}>
      <div className="comment-header">
        <div className="comment-author">
          <h4 className="comment-name">{getDisplayName(comment.name)}</h4>
          <span className="comment-email">{getDisplayEmail(comment.email)}</span>
        </div>
        <button 
          className="delete-button"
          onClick={handleDeleteClick}
          title="Excluir comentário"
        >
          Excluir
        </button>
      </div>
      
      <div className="comment-body">
        <p>{truncateText(comment.body)}</p>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation">
          <p>Tem certeza que deseja excluir este comentário?</p>
          <div className="confirmation-buttons">
            <button 
              className="confirm-delete"
              onClick={handleConfirmDelete}
            >
              Sim, Excluir
            </button>
            <button 
              className="cancel-delete"
              onClick={handleCancelDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
