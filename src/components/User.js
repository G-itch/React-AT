import React from 'react';
import './User.css';

const User = ({ user, onClick, isGridView }) => {
  const handleClick = () => {
    onClick(user);
  };

  return (
    <div 
      className={`user-card ${isGridView ? 'grid-item' : 'list-item'}`}
      onClick={handleClick}
    >
      <div className="user-avatar">
        <span>{user.name.charAt(0).toUpperCase()}</span>
      </div>
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-company">
          <strong>Empresa:</strong> {user.company.name}
        </p>
        <p className="user-catchphrase">
          <em>"{user.company.catchPhrase}"</em>
        </p>
        <div className="user-contact">
          <p className="user-email">{user.email}</p>
          <p className="user-phone">{user.phone}</p>
        </div>
      </div>
      <div className="user-actions">
        <span className="click-hint">Ver posts</span>
      </div>
    </div>
  );
};

export default User;
