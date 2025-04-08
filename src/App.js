import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/user_auth/PrivateRoute";
import { GoogleOAuthProvider } from '@react-oauth/google';

import SignUp from "./components/user_auth/signup";
import SignIn from "./components/user_auth/GoogleLogin";
import Dashboard from "./components/home/Deshboard";
import App1 from "./components/SetUp_State/index2";
import App2 from "./components/SetUp_State/index";

import Setting from "./components/user_auth/SettingsPage";
import Profile from "./components/user_auth/ProfilePage";
import Updatepassword from "./components/setting/update-password";
import LanguageSettingsPage from "./components/setting/LanguageSettingsPage"
import Subscription from "./components/setting/PricingPage"
import GL from "./components/user_auth/GoogleLogin" 


export default function App() {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={
            <GoogleOAuthProvider clientId="679832363574-9don8skic3d6n3r8geli6ippcbrip1pe.apps.googleusercontent.com">
              <SignIn />
            </GoogleOAuthProvider>

          } />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/play"
          element={
            <PrivateRoute>
              <App1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/play2"
          element={
            <PrivateRoute>
              <App2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />
         <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      <Route
          path="/update-password"
          element={
            <PrivateRoute>
              <Updatepassword />
            </PrivateRoute>
          }
        />
              <Route
          path="/language-settings"
          element={
            <PrivateRoute>
              <LanguageSettingsPage  />
            </PrivateRoute>
          }
        />
           <Route
        path="/subscription"
        element={
          <PrivateRoute>
            <Subscription  />
          </PrivateRoute>
        }
      />
        <Route
        path="/gl"
        element={
          // <PrivateRoute>      
        <GoogleOAuthProvider clientId="679832363574-9don8skic3d6n3r8geli6ippcbrip1pe.apps.googleusercontent.com">


            <GL  />
                  </GoogleOAuthProvider>
          // </PrivateRoute>
        }
      />
      </Routes>
    </Router>
  );
}
