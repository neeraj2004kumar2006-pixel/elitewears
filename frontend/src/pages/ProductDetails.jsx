import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');

  const product = products.find(p => p.id === id);

  if (!product) return <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>Product not found.</div>;

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    navigate('/checkout', { state: { product, selectedSize } });
  };

  return (
    <div className="container detail-container">
      <div className="detail-image">
        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className="detail-info">
        <h1 className="detail-title">{product.name}</h1>
        <div className="detail-price">${product.price.toLocaleString()}</div>
        <p className="detail-desc">{product.description}</p>
        
        <div style={{marginBottom: '10px', fontWeight: '500'}}>SELECT SIZE</div>
        <div className="size-selector">
          {product.sizes.map(size => (
            <div 
              key={size} 
              className={`size-btn ${selectedSize === size ? 'active' : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
        
        <button className="btn btn-solid" style={{padding: '18px 0', fontSize: '1.1rem', letterSpacing: '3px'}} onClick={handleBuyNow}>
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
