import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/user_auth/PrivateRoute";

import SignUp from "./components/user_auth/signup";
import SignIn from "./components/user_auth/login";
import Dashboard from "./components/home/Deshboard";
import App1 from "./components/SetUp_State/index2";
import App2 from "./components/SetUp_State/index";

import Setting from "./components/user_auth/SettingsPage";
import Profile from "./components/user_auth/ProfilePage";
import Updatepassword from "./components/setting/update-password";
import LanguageSettingsPage from "./components/setting/LanguageSettingsPage"


export default function App() {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

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
      </Routes>
    </Router>
  );
}
