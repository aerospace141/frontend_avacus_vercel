// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   return token ? children : <Navigate to="/signin" />;
// };

// export default PrivateRoute;

// Enhanced PrivateRoute.js with session monitoring
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const token = localStorage.getItem("token");
  const deviceId = localStorage.getItem("deviceId");

  useEffect(() => {
    if (!token || !deviceId) {
      setIsValidating(false);
      setIsAuthenticated(false);
      return;
    }

    // Set auth header for all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Validate session on mount
    const validateSession = async () => {
      try {
        await axios.get('https://server-avacus.vercel.app/api/session-status');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Session validation failed:', error);
        // Clear invalid session data
        localStorage.removeItem('token');
        localStorage.removeItem('deviceId');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        
        if (error.response?.data?.forceLogout) {
          alert(error.response.data.message);
        }
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();

    // Check session status every 5 minutes
    const sessionCheckInterval = setInterval(async () => {
      try {
        await axios.get('https://server-avacus.vercel.app/api/session-status');
      } catch (error) {
        console.error('Session check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('deviceId');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        
        if (error.response?.data?.forceLogout) {
          alert(error.response.data.message);
          window.location.href = '/signin';
        }
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(sessionCheckInterval);
  }, [token, deviceId]);

  // Setup global axios interceptor for handling forced logouts
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data?.forceLogout) {
          localStorage.removeItem('token');
          localStorage.removeItem('deviceId');
          delete axios.defaults.headers.common['Authorization'];
          setIsAuthenticated(false);
          alert(error.response.data.message);
          window.location.href = '/signin';
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  if (isValidating) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Validating session...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
