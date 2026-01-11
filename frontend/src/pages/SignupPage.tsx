import React, { useState } from 'react';
import { signupUser } from '../api/api';
import './Auth.css';

interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

interface Props {
  onSignup: (username: string, token: string) => void;
  switchToLogin: () => void;
}

const SignupPage: React.FC<Props> = ({ onSignup, switchToLogin }) => {
  const [form, setForm] = useState<CreateUserDto>({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Friendly validation messages
  const validateForm = (): string | null => {
    if (!form.username.trim()) return 'Please fill out your username';
    if (!form.email.trim()) return 'Please fill out your email';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Email must be a valid email';
    if (!form.password) return 'Please fill out your password';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError); // Show friendly message
      return;
    }

    setLoading(true);
    try {
      const response = await signupUser(form);
      const user = response.data;

      const token = `token-${user.id}-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);

      alert('Signup successful!');
      onSignup(user.username, token);
    } catch (err: any) {
      // Show backend error if exists, otherwise generic
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simple-auth-container">
      <form className="simple-auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="switch">
          Already have an account?{' '}
          <button type="button" onClick={switchToLogin}>
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
