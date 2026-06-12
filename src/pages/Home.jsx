import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        {/* Fallback dark background or main cover image if available */}
        <img 
          src={products[0]?.images[0] || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"} 
          alt="Luxury Fashion Hero" 
        />
        <div className="hero-content">
          <p className="hero-subtitle">New Arrivals</p>
          <h1>Where Fashion<br/>Looks Expensive</h1>
          <button 
            className="btn btn-solid"
            onClick={() => {
              document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            DISCOVER COLLECTION
          </button>
        </div>
      </section>

      <section id="collection" className="collection-section">
        <h2 className="section-title">THE COLLECTION</h2>
        <p className="section-subtitle">Curated pieces for the modern wardrobe.</p>
        
        <div className="grid">
          {products.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-img-wrapper">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <h2 className="logo">ELITE WEARS</h2>
        <p style={{color: 'var(--text-light)', marginTop: '20px', fontSize: '0.9rem', letterSpacing: '1px'}}>© {new Date().getFullYear()} ELITE WEARS. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  );
}

export default Home;
