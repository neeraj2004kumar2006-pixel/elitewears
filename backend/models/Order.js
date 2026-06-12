const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  size: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  paymentScreenshotUrl: { type: String },
  transactionId: { type: String },
  status: { type: String, enum: ['Pending Verification', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending Verification' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
