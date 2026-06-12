import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!location.state || !location.state.customerData) {
    return <Navigate to="/" />;
  }

  const { product, selectedSize, customerData } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a payment screenshot.");
      return;
    }
    setLoading(true);
    
    // Simulate a brief submission delay for UX, then go straight to success
    setTimeout(() => {
      setLoading(false);
      navigate('/success');
    }, 1500);
  };

  return (
    <div className="narrow-container">
      <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Complete Payment</h2>
      <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '30px'}}>
        Please scan the QR code to pay <strong>${product.price.toLocaleString()}</strong>.
      </p>
      
      <div className="qr-container">
        {/* Placeholder for real QR code */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="PayPal QR Code" />
        <p style={{marginTop: '10px', fontWeight: '500'}}>Or send via PayPal to: payments@elitewears.com</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Payment Screenshot *</label>
          <input type="file" className="form-control" accept="image/*" required onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-solid btn-full" disabled={loading}>
          {loading ? 'SUBMITTING...' : 'SUBMIT ORDER'}
        </button>
      </form>
    </div>
  );
}

export default Payment;
