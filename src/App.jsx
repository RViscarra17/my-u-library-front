import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { message } from "antd";
import Router from "./components/Router";
import history from "./utils/history";
import { getUser } from "./services/authService";
import AuthContext from "./context/AuthContext";
import BookCreateComponente from "./pages/book/BookCreate";
import BookDetailComponent from "./pages/book/bookDetail";
import BookIndexComponent from "./pages/book/bookIndex";
import CheckoutComponent from "./pages/checkout/Checkout";
import HomeComponent from './pages/home/home';
import LoginComponent from "./pages/auth/login";

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState();

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }

    fetchUser();
  }, [loggedIn]);

  useEffect(() => {
    if (notification?.type) {
      const messageNotification = {
        success: (msg) => message.success(msg),
        error: (msg) => message.error(msg),
      };
      messageNotification[notification.type](notification.msg);
    }
  }, [notification]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, user, setNotification }}
      >
        <Router history={history}>
          <Routes>
          <Route element={<HomeComponent />}>
              <Route path="/" exact element={<BookIndexComponent />} />
              <Route
                path="/book/:book_id"
                exact
                element={<BookDetailComponent />}
              />
              <Route path="/checkouts" exact element={<CheckoutComponent />} />
              <Route
                path="/book/create"
                exact
                element={<BookCreateComponente />}
              />
            </Route>
            <Route path="/login" element={<LoginComponent />} exact />
          </Routes>
        </Router>

      </AuthContext.Provider>
    </div>
  )
}

export default App
