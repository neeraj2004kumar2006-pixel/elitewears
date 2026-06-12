import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const product = products.find(p => p.id === id);

  if (!product) return <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>Product not found.</div>;

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    navigate('/checkout', { state: { product, selectedSize } });
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.offsetWidth;
      const slideIndex = Math.round(scrollLeft / width);
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <div className="container detail-container">
      <div>
        <div 
          className="carousel-container" 
          ref={carouselRef} 
          onScroll={handleScroll}
        >
          {product.images.map((img, idx) => (
            <div key={idx} className="carousel-slide">
              <img src={img} alt={`${product.name} view ${idx + 1}`} />
            </div>
          ))}
        </div>
        {product.images.length > 1 && (
          <div className="carousel-dots">
            {product.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`dot ${currentSlide === idx ? 'active' : ''}`} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="detail-info">
        <h1 className="detail-title">{product.name}</h1>
        <div className="detail-price">₹{product.price.toLocaleString()}</div>
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
        
        <button className="btn btn-solid" style={{padding: '18px 0', fontSize: '1.1rem', letterSpacing: '3px', width: '100%'}} onClick={handleBuyNow}>
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
