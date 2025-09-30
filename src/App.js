import React, { useState, useEffect } from 'react';
import './App.css';
import FetchData from './services/FetchData';
import User from './components/User';
import Post from './components/Post';
import Comment from './components/Comment';
import Navigation from './components/Navigation';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentView, setCurrentView] = useState('users');
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await FetchData.getUsers();
      setUsers(usersData);
      setCurrentView('users');
      setSelectedUser(null);
      setSelectedPost(null);
      setPosts([]);
      setComments([]);
    } catch (err) {
      let errorMessage = 'Erro ao carregar usuários';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Problema de conexão. Verifique sua internet.';
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const postsData = await FetchData.getPostsByUserId(user.id);
      setSelectedUser(user);
      setPosts(postsData);
      setCurrentView('posts');
      setSelectedPost(null);
      setComments([]);
    } catch (err) {
      let errorMessage = 'Erro ao carregar posts do usuário';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Problema de conexão ao carregar posts.';
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (post) => {
    setLoading(true);
    setError(null);
    try {
      const commentsData = await FetchData.getCommentsByPostId(post.id);
      setSelectedPost(post);
      setComments(commentsData);
      setCurrentView('comments');
    } catch (err) {
      let errorMessage = 'Erro ao carregar comentários do post';
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Problema de conexão ao carregar comentários.';
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUsers = () => {
    loadUsers();
  };

  const handleBackToPosts = () => {
    setCurrentView('posts');
    setSelectedPost(null);
    setComments([]);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
          <button onClick={loadUsers} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'users':
        return (
          <div className={`content ${isGridView ? 'grid-view' : 'list-view'}`}>
            {users.map(user => (
              <User
                key={user.id}
                user={user}
                onClick={() => handleUserClick(user)}
                isGridView={isGridView}
              />
            ))}
          </div>
        );
      
      case 'posts':
        return (
          <div className={`content ${isGridView ? 'grid-view' : 'list-view'}`}>
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post)}
                isGridView={isGridView}
              />
            ))}
          </div>
        );
      
      case 'comments':
        return (
          <div className={`content ${isGridView ? 'grid-view' : 'list-view'}`}>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
                isGridView={isGridView}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>AT React</h1>
        <div className="header-controls">
          <button 
            onClick={toggleViewMode}
            className="view-toggle"
            title={isGridView ? 'Alternar para Lista' : 'Alternar para Grade'}
          >
            {isGridView ? 'Lista' : 'Grade'}
          </button>
        </div>
      </header>

      <Navigation
        currentView={currentView}
        selectedUser={selectedUser}
        selectedPost={selectedPost}
        onBackToUsers={handleBackToUsers}
        onBackToPosts={handleBackToPosts}
      />

      <main className="main">
        {renderContent()}
      </main>

    </div>
  );
}

export default App;
