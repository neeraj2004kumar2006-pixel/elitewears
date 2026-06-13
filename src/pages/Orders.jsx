import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem('elite_orders') || '[]');
      const userOrders = allOrders.filter(o => o.userId === user.id);
      setOrders(userOrders);
    }
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>Loading...</div>;
  }

  return (
    <div className="container fade-in-up" style={{maxWidth: '800px', margin: '60px auto', padding: '0 20px'}}>
      <h1 className="detail-title" style={{textAlign: 'center', marginBottom: '40px'}}>MY ORDERS</h1>

      {orders.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', background: 'var(--secondary-black)', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
          <p style={{color: 'var(--text-light)', marginBottom: '20px'}}>You haven't placed any orders yet.</p>
          <button className="btn btn-solid" onClick={() => navigate('/')}>
            START SHOPPING
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" style={{
              background: 'var(--secondary-black)',
              border: '1px solid var(--border-color)',
              marginBottom: '30px',
              padding: '20px',
              borderRadius: '8px'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px'}}>
                <div>
                  <h3 style={{color: 'var(--accent-gold)', marginBottom: '5px'}}>Order #{order.id}</h3>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-light)'}}>Placed on: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p style={{fontWeight: 'bold', fontSize: '1.2rem'}}>${order.total.toLocaleString()}</p>
                  <p style={{fontSize: '0.85rem', color: '#4caf50'}}>Status: Processing</p>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px'}}>
                    <img src={item.product.images[0]} alt={item.product.name} style={{width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px'}} />
                    <div>
                      <p style={{fontWeight: '500'}}>{item.product.name}</p>
                      <p style={{fontSize: '0.85rem', color: 'var(--text-light)'}}>Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {order.discount > 0 && (
                <div style={{marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)', color: '#4caf50', fontSize: '0.9rem'}}>
                  Includes ${order.discount} Multi-Item Discount
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
