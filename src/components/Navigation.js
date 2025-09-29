import React from 'react';
import './Navigation.css';

const Navigation = ({ 
  currentView, 
  selectedUser, 
  selectedPost, 
  onBackToUsers, 
  onBackToPosts 
}) => {
  const getBreadcrumb = () => {
    const items = [
      { label: 'Usuários', active: currentView === 'users' }
    ];

    if (selectedUser) {
      items.push({ 
        label: `Posts de ${selectedUser.name}`, 
        active: currentView === 'posts' 
      });
    }

    if (selectedPost) {
      items.push({ 
        label: `Comentários do Post #${selectedPost.id}`, 
        active: currentView === 'comments' 
      });
    }

    return items;
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <nav className="navigation">
      <div className="breadcrumb">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <span className={`breadcrumb-item ${item.active ? 'active' : ''}`}>
              {item.label}
            </span>
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator">›</span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="navigation-buttons">
        {currentView === 'posts' && (
          <button onClick={onBackToUsers} className="back-button">
            Voltar aos Usuários
          </button>
        )}
        {currentView === 'comments' && (
          <>
            <button onClick={onBackToPosts} className="back-button">
              Voltar aos Posts
            </button>
            <button onClick={onBackToUsers} className="back-button">
              Voltar aos Usuários
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
