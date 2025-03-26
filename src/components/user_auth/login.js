import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import Message from '../global/alert';

// import "../../style/user_auth/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";


const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  useEffect(() => {
    // Set timeout to remove the message after 5 seconds
    const timer = setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);

    // Clear the timeout when the component unmounts or when message changes
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare login data
    const loginData = {
      mobileNumber,
      password
    };

    try {
      const response = await fetch('https://server-avacus-vercel.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
     
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token; // Check if token property exists
        if (token) {
          localStorage.setItem('token', token);
          console.log('Login successful');
          setMessage({ type: 'success', text: 'Login successful' });
          setIsLoggedIn(true);
          
          navigate('/');
          // Optionally, redirect to dashboard or perform other actions
        } else {
          console.error('Token not found in response');
          setMessage({ type: 'error', text: 'Token not found in response' });
        }
      } else {
         const responseData = await response.json();

        setMessage({ type: 'error', text: responseData.message || 'Login failed' });

      }
      
    } catch (error) {
      console.error('Error during login:', error);
      setMessage({ type: 'error', text: 'Error during login' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
<div className="log-body">
    <div className="login-form">
        {isLoggedIn ? (
            <button className="log-button" onClick={handleLogout}>Logout</button>
        ) : (
            <div>
                <h2 className="log-h2">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="log-labal" htmlFor="mobileNumber">Mobile Number</label>
                        <input className="log-input" type="mobileNumber" id="mobileNumber" value={mobileNumber} onChange={(e) => setphone(e.target.value)} required placeholder="Type your mobile number" />
                    </div>
                    <div className="form-group">
                        <label className="log-labal" htmlFor="password">Password</label>
                        <input className="log-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Type your password" />
                    </div>
                    <button className="log-button" type="submit">Login</button>
                </form>
                <a className="button-a" href="/forgot-password">Forgot password?</a>
                <div className="social-login">
                    <p>Or Sign Up Using</p>
                    <div className="social-icons">
                      <FontAwesomeIcon icon={faFacebook} className="social-icon facebook" />
                      <FontAwesomeIcon icon={faTwitter} className="social-icon twitter" />
                      <FontAwesomeIcon icon={faGoogle} className="social-icon google" />
                    </div>
                </div>
                <a className="button-a" href="/signup">Create an Account</a>
            </div>
        )}
        {/* <Message type={message.type} text={message.text} /> */}
    </div>
</div>
);
}


export default Login;