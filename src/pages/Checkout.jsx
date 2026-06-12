import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.product) {
    return <Navigate to="/" />;
  }

  const { product, selectedSize } = location.state;
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleProceed = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { product, selectedSize, customerData: formData } });
  };

  return (
    <div className="narrow-container">
      <h2 style={{marginBottom: '30px', textAlign: 'center'}}>Checkout Details</h2>
      <div style={{marginBottom: '30px', padding: '20px', background: '#f9f9f9', border: '1px solid #eee'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
          <strong>Item</strong>
          <span>{product.name} (Size: {selectedSize})</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <strong>Total</strong>
          <span style={{color: 'var(--primary-gold)', fontWeight: '600'}}>${product.price.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleProceed}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="customerName" className="form-control" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" className="form-control" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Delivery Address</label>
          <textarea name="address" className="form-control" rows="3" required onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-solid btn-full">PROCEED TO PAYMENT</button>
      </form>
    </div>
  );
}

export default Checkout;
