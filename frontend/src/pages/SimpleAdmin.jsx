import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SimpleAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Pending Verification': return 'status-pending';
      case 'Confirmed': return 'status-confirmed';
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  if (loading) return <div className="container" style={{paddingTop: '50px'}}>Loading admin...</div>;

  return (
    <div className="container" style={{padding: '50px 0'}}>
      <h2>Admin Dashboard - Orders</h2>
      <p style={{color: 'var(--text-light)', marginBottom: '30px'}}>Manage incoming orders and verify payments.</p>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Screenshot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td style={{fontSize: '0.8rem', color: '#666'}}>{order._id}</td>
                  <td>
                    <strong>{order.customerName}</strong><br/>
                    <span style={{fontSize: '0.85rem'}}>{order.phoneNumber}</span>
                  </td>
                  <td>
                    {order.product?.name || 'Unknown Product'} <br/>
                    Size: {order.size}
                  </td>
                  <td>
                    {order.paymentScreenshotUrl ? (
                      <a href={`http://localhost:5000${order.paymentScreenshotUrl}`} target="_blank" rel="noreferrer" style={{color: 'var(--primary-gold)'}}>
                        View Screenshot
                      </a>
                    ) : 'No Image'}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{padding: '5px', borderRadius: '4px', border: '1px solid #ccc'}}
                    >
                      <option value="Pending Verification">Pending Verification</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SimpleAdmin;
