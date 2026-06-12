import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{
        height: '80vh',
        background: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}></div>
        <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', letterSpacing: '5px' }}>ELITE WEARS</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', letterSpacing: '2px', fontWeight: 300 }}>DEFINING MODERN LUXURY</p>
          <a href="#collection" className="btn btn-solid" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>DISCOVER THE COLLECTION</a>
        </div>
      </section>

      {/* Brand Section */}
      <section className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '2rem' }}>OUR STORY</h2>
        <p style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Elite Wears represents the pinnacle of contemporary fashion. Born from a desire to merge timeless elegance with modern sophistication, our pieces are curated for those who demand nothing but the absolute best. Welcome to the new standard of luxury.
        </p>
      </section>

      {/* Product Collection Grid */}
      <section id="collection" className="container" style={{ padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>THE COLLECTION</h2>
        <div className="product-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="product-card">
                <img src={product.images[0]} alt={product.name} />
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: 400 }}>{product.name}</h3>
                  <div style={{ fontSize: '1.1rem', color: 'var(--primary-gold)', fontWeight: 600 }}>
                    ${product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ backgroundColor: 'var(--primary-black)', color: 'var(--primary-gold)', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '30px', color: '#fff' }}>CONTACT US</h2>
          <p style={{ marginBottom: '10px' }}>Email: support@elitewears.com</p>
          <p style={{ marginBottom: '30px' }}>Phone: +1 (555) 123-4567</p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>&copy; {new Date().getFullYear()} Elite Wears. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
