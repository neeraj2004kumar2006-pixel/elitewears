import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Profile Header */}
      <header className="profile-header">
        <div className="profile-avatar">
          {/* Logo placeholder - using the first product image or a generic gold circle for now */}
          <div style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '2rem', fontWeight: 'bold'}}>
            EV
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-username">
            <h2>elitewears.gallery</h2>
            <button className="btn btn-solid">Follow</button>
            <button className="btn">Message</button>
          </div>
          <ul className="profile-stats">
            <li><strong>105</strong> posts</li>
            <li><strong>415</strong> followers</li>
            <li><strong>1</strong> following</li>
          </ul>
          <div className="profile-bio">
            <p><strong>E L I T E W E A R S G A L L E R Y</strong></p>
            <p style={{color: 'var(--text-light)'}}>Photographer</p>
            <p>Premium Fits ✨</p>
            <p>Where Fashion Looks Expensive 💅</p>
            <p>Worldwide 🌎</p>
          </div>
        </div>
      </header>

      {/* Story Highlights (Mock) */}
      <div className="highlights-container">
        {['Turkish ✨', 'Berlin 🔰', 'Paris 💍', 'France', 'India 🇮🇳'].map((name, i) => (
          <div key={name} className="highlight-item">
            <div className="highlight-ring">
              <div style={{width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#333'}}></div>
            </div>
            <span className="highlight-title">{name}</span>
          </div>
        ))}
      </div>

      {/* Insta Tabs */}
      <div className="insta-tabs">
        <div className="tab-item active">
          <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
            <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
          </svg>
          POSTS
        </div>
        <div className="tab-item">
          <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
            <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
          </svg>
          SAVED
        </div>
      </div>

      {/* Product Grid */}
      <div className="insta-grid">
        {products.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.images[0]} alt={product.name} />
            <div className="product-overlay">
              <h3 style={{fontSize: '1.2rem', marginBottom: '5px'}}>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
