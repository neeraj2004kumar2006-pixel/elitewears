import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const fallbackProducts = [
  {
    _id: '1',
    name: 'Onyx Silk Dress',
    price: 890,
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: '2',
    name: 'Gold Trim Blazer',
    price: 1250,
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: '3',
    name: 'Midnight Velvet Gown',
    price: 2100,
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: '4',
    name: 'Ivory Cashmere Coat',
    price: 3400,
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
  }
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error('Error fetching products', error);
        setProducts(fallbackProducts); // Use fallback if backend is down
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>Loading Luxury Catalog...</div>;

  return (
    <div className="container">
      <div className="insta-grid">
        {products.map(product => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="product-card">
              <img src={product.images[0]} alt={product.name} />
              <div className="product-overlay">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">${product.price.toLocaleString()}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
