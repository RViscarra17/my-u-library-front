import React, { useEffect, useState } from "react";
import LoginComponent from "./pages/auth/login";
import 'antd/dist/antd.css';
import './App.css';
import Router from "./components/Router";
import { Routes, Route } from "react-router-dom";
import history from "./utils/history";
import HomeComponent from './pages/home/home';
import { getUser } from "./services/authService";
import AuthContext from "./context/AuthContext";


function App() {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }

    fetchUser();
  }, [loggedIn]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, user }}
      >
        <Router history={history}>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} exact />
          </Routes>
        </Router>

      </AuthContext.Provider>
    </div>
  )
}

export default App
