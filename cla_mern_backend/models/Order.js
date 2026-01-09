const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    city: String,
    address: String,
    total: Number,
    screenshot: String, // Path save karne ke liye
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);