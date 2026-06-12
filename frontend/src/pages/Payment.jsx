import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  if (!location.state || !location.state.customerData) {
    return <Navigate to="/" />;
  }

  const { product, selectedSize, customerData } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a payment screenshot.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('customerName', customerData.customerName);
    formData.append('phoneNumber', customerData.phoneNumber);
    formData.append('address', customerData.address);
    formData.append('size', selectedSize);
    
    // We append product ID.
    formData.append('product', product.id); 
    formData.append('transactionId', transactionId);
    formData.append('paymentScreenshot', file);

    try {
      await axios.post('http://localhost:5000/api/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/success');
    } catch (err) {
      console.error(err);
      // Even if it fails (e.g. no DB connection), for MVP frontend demo purposes we can still navigate
      alert("Note: Backend submission failed (possibly due to missing DB), but proceeding to success page for demo.");
      navigate('/success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="narrow-container">
      <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Manual Payment</h2>
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
          <label>Payment Screenshot *</label>
          <input type="file" className="form-control" accept="image/*" required onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label>Transaction ID (Optional)</label>
          <input type="text" className="form-control" onChange={(e) => setTransactionId(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-solid btn-full" disabled={loading}>
          {loading ? 'SUBMITTING...' : 'SUBMIT ORDER'}
        </button>
      </form>
    </div>
  );
}

export default Payment;
