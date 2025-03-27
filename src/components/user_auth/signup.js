import React, { useState, useEffect } from "react";
import "../../styles/user_auth/login.css"

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordMatch, setPasswordMatch] = useState(null);

  useEffect(() => {
    // Check if passwords match
    setPasswordMatch(password && confirmPassword && password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordMatch) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
    };

    try {
      const response = await fetch('https://avacus.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'User registered successfully!' });
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message || "Failed to register user." });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error during registration.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* <h2>Create Account</h2> */}
        <div className="logo" style={{fontSize: '18px', marginBottom: '30px'}}>
        Create Account
          </div>
        
        {message.text && (
          <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
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
          
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={!passwordMatch}
          >
            Sign Up
          </button>
        </form>
        
        <div className="auth-toggle">
          <a href="/signin">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;