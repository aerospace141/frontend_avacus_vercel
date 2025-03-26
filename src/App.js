import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/user_auth/PrivateRoute";

import SignUp from "./components/user_auth/signup";
import SignIn from "./components/user_auth/login";
import Dashboard from "./components/home/Deshboard";
import App1 from "./components/SetUp_State/index";



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
      </Routes>
    </Router>
  );
}
