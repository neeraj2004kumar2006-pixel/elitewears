const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: String }],
  images: [{ type: String }], // Array of image URLs/paths
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
