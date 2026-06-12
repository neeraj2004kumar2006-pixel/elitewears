import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="narrow-container" style={{textAlign: 'center', padding: '60px 40px'}}>
      <div style={{fontSize: '4rem', color: 'var(--primary-gold)', marginBottom: '20px'}}>✓</div>
      <h2 style={{marginBottom: '20px'}}>Order Submitted</h2>
      <p style={{marginBottom: '10px'}}>Your order has been placed successfully.</p>
      <p style={{color: 'var(--text-light)', marginBottom: '30px'}}>
        Status: <span className="status-badge status-pending">Pending Verification</span>
      </p>
      <p style={{marginBottom: '40px', fontSize: '0.95rem', lineHeight: '1.6'}}>
        Our team will manually verify your payment screenshot. Once verified, your order status will be updated to Confirmed.
      </p>
      <Link to="/" className="btn btn-solid">RETURN TO CATALOG</Link>
    </div>
  );
}

export default Success;
