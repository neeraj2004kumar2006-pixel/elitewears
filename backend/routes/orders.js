const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directories and files exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const ordersFile = path.join(__dirname, '../orders.json');
if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, JSON.stringify([]));

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Create order
router.post('/', upload.single('paymentScreenshot'), (req, res) => {
  try {
    const orderData = req.body;
    
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'Pending Verification',
      createdAt: new Date().toISOString()
    };

    if (req.file) {
      newOrder.paymentScreenshotUrl = `/uploads/${req.file.filename}`;
    }

    const currentOrders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
    currentOrders.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(currentOrders, null, 2));

    res.status(201).json({ message: 'Order submitted successfully', orderId: newOrder.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to process order' });
  }
});

module.exports = router;
