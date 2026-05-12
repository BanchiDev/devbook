import React, { useState } from 'react';
import axios from 'axios';

const EmailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      setStatus({ type: 'success', message: 'Welcome back! Login successful.' });
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed. Invalid email or password.';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <div className="register-container">
      <h2 className="title">Welcome Back</h2>
      <p className="subtitle">Sign in to continue your journey.</p>

      {status.message && <div className={`status-msg ${status.type}`}>{status.message}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-wrapper">
          <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
          <div className="input-icon"><EmailIcon/></div>
        </div>

        <div className="input-wrapper">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <div className="input-icon"><LockIcon/></div>
        </div>

        <button type="submit" className="submit-btn" style={{marginTop: '1.25rem'}}>Log in</button>
      </form>
    </div>
  );
};

export default Login;