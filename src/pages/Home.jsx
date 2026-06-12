import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products, heroImage } from '../data/products';

function Home() {
  const navigate = useNavigate();

  // Extract unique categories
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
      <section className="hero">
        {/* Full HD Hero Image */}
        <img 
          src={heroImage} 
          alt="Premium Fashion Hero" 
          style={{ opacity: 0.7 }}
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
        {categories.map((category, idx) => (
          <div key={category} style={{ marginBottom: idx === categories.length - 1 ? '0' : '100px' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px' }}>{category}</h2>
            
            <div className="grid">
              {products.filter(p => p.category === category).map(product => (
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
                    <p className="product-price">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer>
        <div className="logo">
          <img src="/logo.svg" alt="Elite Wears Logo" style={{height: '60px'}} />
        </div>
        <p style={{color: 'var(--text-light)', marginTop: '20px', fontSize: '0.9rem', letterSpacing: '1px'}}>© {new Date().getFullYear()} ELITE WEARS. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  );
}

export default Home;
