import React, { useState } from 'react';
import { loginUser } from '../api/api';
import './Auth.css';

interface Props {
  onLogin: (username: string, token: string) => void;
  switchToSignup: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Frontend validation function ---
  const validateForm = (): string | null => {
    if (!email.trim()) return 'Please fill out email';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email must be a valid email';
    if (!password.trim()) return 'Please fill out password';
    return null;
  };

  // --- Handle form submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check frontend validation first
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return; // Stop submission if invalid
    }

    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      // For demo, derive username from email
      const username = email.split('@')[0];
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      alert('Login successful!'); // ✅ Alert when login succeeds
      onLogin(username, token);
    } catch (err: any) {
      // Show backend error or a generic message
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simple-auth-container">
      <form className="simple-auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* Display error messages */}
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="switch">
          Don't have an account?{' '}
          <button type="button" onClick={switchToSignup}>
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
