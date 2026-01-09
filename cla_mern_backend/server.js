const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');

const Order = require('./models/Order');
const Feedback = require('./models/Feedback');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Uploads folder setup (Public access ke liye)
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Multer Storage Setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// 3. Database Connection
const mongoURI = "mongodb://127.0.0.1:27017/cla_tech_db";
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB ✅"))
    .catch(err => console.log("DB Connection Error: ", err));

// --- ORDERS APIs ---

// Naya Order Save karna (POST)
app.post('/api/orders', upload.single('payment_screenshot'), async (req, res) => {
    try {
        const orderData = {
            customerName: req.body.customerName,
            city: req.body.city,
            address: req.body.address,
            total: req.body.total,
            screenshot: req.file ? req.file.path : null 
        };

        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({ message: "Order with Screenshot saved!", data: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ********** YAHAN UPDATE KIYA HAI: Saare Orders dekhna (GET) **********
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 1. Order Delete karne ke liye
app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Feedback Delete karne ke liye
app.delete('/api/feedback/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Order ka Status update karne ke liye (Pending/Dispatched/Delivered)
app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Feedback/Contact Message Save karne ke liye
app.post('/api/feedback', async (req, res) => {
    try {
        const newFeedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await newFeedback.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// --- FEEDBACK APIs ---

app.post('/api/feedback', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json({ message: "Feedback mil gaya!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Feedback dekhne ke liye GET route
app.get('/api/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));