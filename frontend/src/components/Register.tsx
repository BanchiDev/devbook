import React, { useState } from 'react';
import axios from 'axios';

const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const EmailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '', dateOfBirth: '', acceptedTerms: false,
  });
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string }>({ type: null, message: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setStatus({ type: 'success', message: 'Registration successful! Welcome.' });
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <div className="register-container">
      <h2 className="title">Join SyncleraBook</h2>
      <p className="subtitle">Enter your details to create your profile.</p>

      {status.message && <div className={`status-msg ${status.type}`}>{status.message}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row" style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="input-wrapper" style={{ flex: 1 }}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <div className="input-icon"><UserIcon/></div>
          </div>
          <div className="input-wrapper" style={{ flex: 1 }}>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-wrapper">
          <input type="text" name="username" placeholder="Pick a username" value={formData.username} onChange={handleChange} required />
          <div className="input-icon"><UserIcon/></div>
        </div>

        <div className="input-wrapper">
          <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
          <div className="input-icon"><EmailIcon/></div>
        </div>

        <div className="input-wrapper">
          <input type="password" name="password" placeholder="Create password (min. 6 chars)" value={formData.password} onChange={handleChange} required minLength={6} />
          <div className="input-icon"><LockIcon/></div>
        </div>

        <div className="input-wrapper">
          <label style={{ fontSize: '0.75rem', color: '#888888', marginBottom: '0.25rem', display: 'block', fontWeight: 500 }}>
            Date of Birth
          </label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required style={{ color: formData.dateOfBirth ? 'black' : '#888888' }} />
        </div>

        <div className="terms-row">
          <input type="checkbox" name="acceptedTerms" id="termsCheck" checked={formData.acceptedTerms} onChange={handleChange} required />
          <label htmlFor="termsCheck" className="terms-label">
            I understand and accept the <button type="button" className="terms-link" onClick={() => setIsModalOpen(true)}>Terms & Privacy Policy</button>.
          </label>
        </div>

        <button type="submit" className="submit-btn">Create Account</button>
      </form>

      {/* --- TERMS MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Terms & Privacy Policy</h3>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <h4>1. Introduction</h4>
              <p>Welcome to SyncleraBook. By using our platform, you agree to comply with these terms.</p>
              <h4>2. Data Collection</h4>
              <p>We collect essential information to create secure profiles and facilitate networking.</p>
              <h4>3. Security</h4>
              <p>Your passwords are never stored in plain text; we use enterprise-grade hashing (Bcrypt).</p>
            </div>
            <div className="modal-footer">
              <button className="accept-modal-btn" onClick={() => { setFormData(prev => ({ ...prev, acceptedTerms: true })); setIsModalOpen(false); }}>
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;