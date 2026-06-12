import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartTotal, clearCart } = useCart();
  
  const formData = location.state?.formData;

  if (!formData || cartTotal === 0) {
    navigate('/');
    return null;
  }

  const handleSimulatePayment = () => {
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
