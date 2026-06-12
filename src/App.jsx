import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Success from './pages/Success';
import CartSidebar from './components/CartSidebar';
import { useCart } from './context/CartContext';

function App() {
  const { itemCount, setIsCartOpen } = useCart();

  const categories = [
    "Evening Gowns", 
    "Luxury Co-ords", 
    "Premium Ethnic", 
    "Signature Bottoms", 
    "Exclusive Fits", 
    "Timeless Classics"
  ];

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar dark-nav">
          <Link to="/" className="logo">
            <img src="/logo.svg" alt="Elite Wears Logo" className="nav-logo-img" />
          </Link>
          
          <div className="nav-categories">
            {categories.map(cat => (
              <a href={`/#${cat.replace(/\s+/g, '-')}`} key={cat} className="nav-cat-link">{cat}</a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
              🛒
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-solid login-btn">SIGN IN</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
        
        <CartSidebar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
