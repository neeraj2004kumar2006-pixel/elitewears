import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, cartTotal } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: user ? user.fullName || '' : '',
    email: user && user.primaryEmailAddress ? user.primaryEmailAddress.emailAddress : '',
    address: '',
    city: '',
    zip: ''
  });

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>
        <h2>Your cart is empty.</h2>
        <button className="btn btn-solid" style={{marginTop: '20px'}} onClick={() => navigate('/')}>
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { formData } });
  };

  return (
    <div className="container narrow-container fade-in-up">
      <h1 className="detail-title" style={{textAlign: 'center', marginBottom: '30px'}}>CHECKOUT</h1>
      
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            <div>
              <p style={{fontWeight: 'bold', fontSize: '1rem'}}>{item.product.name}</p>
              <p style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>Size: {item.size} | Qty: {item.quantity}</p>
            </div>
            <p>${(item.product.price * item.quantity).toLocaleString()}</p>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '1rem', color: 'var(--text-light)' }}>
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1rem', color: '#4caf50' }}>
            <span>Discount (3+ Items)</span>
            <span>-${discount.toLocaleString()}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-white)' }}>
          <span>Grand Total</span>
          <span>${cartTotal.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{marginTop: '40px'}}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Shipping Address</label>
          <input type="text" name="address" required value={formData.address} onChange={handleChange} />
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" required value={formData.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>ZIP / Postal Code</label>
            <input type="text" name="zip" required value={formData.zip} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-solid" style={{width: '100%', padding: '15px 0', marginTop: '20px'}}>
          PROCEED TO PAYMENT
        </button>
      </form>
    </div>
  );
}

export default Checkout;
