import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const fallbackProducts = {
  '1': { _id: '1', name: 'Onyx Silk Dress', price: 890, description: 'Handcrafted premium silk dress with intricate onyx detailing.', sizes: ['XS', 'S', 'M', 'L'], images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] },
  '2': { _id: '2', name: 'Gold Trim Blazer', price: 1250, description: 'Tailored to perfection, this blazer features subtle gold trimming for an exquisite look.', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] },
  '3': { _id: '3', name: 'Midnight Velvet Gown', price: 2100, description: 'Elegance redefined. A stunning midnight blue velvet gown for the most exclusive events.', sizes: ['S', 'M', 'L'], images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] },
  '4': { _id: '4', name: 'Ivory Cashmere Coat', price: 3400, description: 'Pure Mongolian cashmere coat in delicate ivory. Ultimate warmth and luxury.', sizes: ['M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] },
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Product fetch failed, using fallback', error);
        setProduct(fallbackProducts[id]);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>Loading...</div>;

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
