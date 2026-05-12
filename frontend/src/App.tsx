import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="app-layout" role="main">
      <div className="auth-stage">
        
        <div key={showLogin ? 'login' : 'register'} className="auth-card-animator">
          {showLogin ? <Login /> : <Register />}
        </div>
        
        <div className="auth-switch">
          <p>
            {showLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="switch-btn" 
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? 'Create Account' : 'Log in'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;