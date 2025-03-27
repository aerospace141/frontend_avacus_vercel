import React, { useState } from "react";
import "../../styles/user_auth/login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginData = {
      mobileNumber: email,
      password
    };

    try {
      const response = await fetch('https://server-avacus.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        
        if (token) {
          localStorage.setItem('token', token);
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('Login error');
    }
  };

  return (
    <div className="Login_page">
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo">UI</div>
        <div className="logo" style={{fontSize: '18px', marginBottom: '30px'}}>
          vector interface
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
          >
            SIGN IN
          </button>
        </form>
        
        <a href="/forgot-password" className="forgot-password">
          Forgot the password? Click here
        </a>
      </div>
    </div>
</div>
  );
};

export default Login;