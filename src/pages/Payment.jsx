import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { useUser } from '@clerk/clerk-react';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, cartTotal, discount, clearCart } = useCart();
  const { user } = useUser();
  
  const formData = location.state?.formData;

  if (!formData || cartTotal === 0) {
    navigate('/');
    return null;
  }

  const handleSimulatePayment = () => {
    // Save order to mock DB (localStorage)
    const newOrder = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000),
      userId: user ? user.id : 'guest',
      date: new Date().toISOString(),
      items: cartItems,
      total: cartTotal,
      discount: discount,
      shipping: formData
    };
    const savedOrders = JSON.parse(localStorage.getItem('elite_orders') || '[]');
    localStorage.setItem('elite_orders', JSON.stringify([newOrder, ...savedOrders]));

    // Clear cart upon successful payment
    clearCart();
    navigate('/success');
  };

  return (
    <div className="container narrow-container fade-in-up" style={{textAlign: 'center', paddingTop: '100px'}}>
      <h1 className="detail-title">COMPLETE PAYMENT</h1>
      
      <div style={{margin: '40px 0'}}>
        {/* Replace this with an actual dynamic QR code generation or your static QR code */}
        <img 
          src="/qr.png" 
          alt="Payment QR Code" 
          style={{ width: '250px', height: '250px', borderRadius: '15px', border: '5px solid var(--primary-white)', objectFit: 'contain', backgroundColor: 'white' }} 
        />
      </div>

      <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '30px'}}>
        Please scan the QR code to pay <strong>${cartTotal.toLocaleString()}</strong>.
      </p>

      <button className="btn btn-solid" style={{padding: '15px 40px'}} onClick={handleSimulatePayment}>
        I HAVE PAID
      </button>
    </div>
  );
}

export default Payment;
