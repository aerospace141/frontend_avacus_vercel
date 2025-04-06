import React, { useState, useEffect } from "react";
import "../../styles/user_auth/login.css";
import { useNavigate } from 'react-router-dom';
import Message from "../ui/alert";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      mobileNumber: email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        if (token) {
          localStorage.setItem('token', token);
          window.location.href = '/';
        }
      } else {
        showMessage('error', responseData.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showMessage('error', 'Error during login. Please try again later.');
    }
  };

  return (
    <div className="Login_page">
      <div className="auth-container">
        <div className="auth-form">
          <div className="logo">UI</div>
          <div className="logo" style={{ fontSize: '18px', marginBottom: '30px' }}>
            vector interface
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Mobile Number"
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

            <button type="submit" className="auth-button">SIGN IN</button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const { credential } = credentialResponse;

                  // Optional: Decode and see user data
                  const userInfo = jwtDecode(credential);
                  console.log("Decoded Google User:", userInfo);

                  const res = await fetch("http://localhost:5000/api/auth/google", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: credential }),
                  });

                  const data = await res.json();

                  if (res.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/';
                  } else {
                    showMessage('error', data.error || "Google login failed");
                  }
                } catch (err) {
                  showMessage('error', 'Google login error');
                  console.error(err);
                }
              }}
              onError={() => showMessage('error', 'Google login failed')}
            />
          </div>

          <a href="/forgot-password" className="forgot-password">
            Forgot the password? Click here
          </a>
          <a href="/signup" className="forgot-password">
            SIGN UP
          </a>
        </div>
      </div>
      <Message type={message.type} text={message.text} />
    </div>
  );
};

export default Login;
