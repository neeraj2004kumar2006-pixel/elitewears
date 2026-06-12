import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Success from './pages/Success';
import SimpleAdmin from './pages/SimpleAdmin';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="logo">ELITE WEARS</Link>
          <div className="nav-links">
            <Link to="/" style={{ marginRight: '20px', fontWeight: 500 }}>CATALOG</Link>
            <Link to="/admin" style={{ fontWeight: 500, fontSize: '0.8rem', color: '#777' }}>ADMIN</Link>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<SimpleAdmin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
