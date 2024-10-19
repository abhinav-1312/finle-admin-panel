/* ----------------------------------------------------------------------------
Information Contained Herein is Proprietary and Confidential. copyright notice in all copies, 
acknowledging that the code is provided without warranties, and strictly prohibiting unauthorized 
sharing or distribution without prior written consent from the copyright holder<DKG Labs Pvt. Ltd>
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import "./App.scss";
import Login from "./auth/Login";
import Layout from "./components/common/Layout";
import AppRoutes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

const MAX_IDLE_TIME = 3 * 60 * 60 * 1000; 

axios.defaults.baseURL = 'https://finle-api-gateway.azurewebsites.net'

const App: React.FC = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    if (storedUserRole && storedToken) {
      setUserRole(storedUserRole);
    }
  }, []);

  const logout = () => {
    // localStorage.removeItem("userId");
    // localStorage.removeItem("userRole");
    // localStorage.removeItem("mobileNumber");
    // localStorage.removeItem("userType");
    // localStorage.removeItem("firstName");
    // localStorage.removeItem("lastName");
    // localStorage.removeItem("userdetails");
    // localStorage.removeItem("token");
    localStorage.clear()
    window.location.reload();
  };

  useEffect(() => {
    let idleTimer: NodeJS.Timeout | null = null;

    const resetIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      idleTimer = setTimeout(logout, MAX_IDLE_TIME);
    };

    const events = ["mousedown", "keydown", "mousemove", "touchstart"];
    
    const resetTimerOnEvent = () => {
      events.forEach((event) => {
        document.addEventListener(event, resetIdleTimer);
      });
    };

    resetTimerOnEvent();
    resetIdleTimer();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, []);

  return (
    <div className="app">
      <Router>
        {userRole.length === 0 ||
        !localStorage.getItem("userRole") ||
        userRole === "" ? (
          <Login />
        ) : (
          <Layout>
            <AppRoutes />
          </Layout>
        )}
      </Router>
    </div>
  );
};

export default App;
