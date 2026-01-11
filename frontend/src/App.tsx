import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [user, setUser] = useState<{ username: string; token: string } | null>(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  if (user) {
    return <ChatPage username={user.username} token={user.token} onLogout={handleLogout} />;
  }

  if (showSignup) {
    return (
      <SignupPage
        onSignup={(username, token) => setUser({ username, token })}
        switchToLogin={() => setShowSignup(false)}
      />
    );
  }

  return <LoginPage onLogin={(username, token) => setUser({ username, token })} switchToSignup={() => setShowSignup(true)} />;
}

export default App;
