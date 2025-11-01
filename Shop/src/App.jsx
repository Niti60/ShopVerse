import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import AdminDashboard from './Components/AdminDashboard';
import { authAPI } from './services/api';
import './App.css';
import Home from './Page/Home';

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data.user);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartCount(0);
  };

  const handleCartUpdate = (count) => {
    setCartCount(count);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.5rem' }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/Products" element={<ProductList user={user} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/cart"
            element={
              user ? (
                <Cart onCartUpdate={handleCartUpdate} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              user && user.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;