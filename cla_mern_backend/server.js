// --- PEHLE SAMJHTE HAIN YE CHEEZAIN KYA HAIN ---
// Express: Ye ek framework hai jo hamari website ka rasta (routes) banata hai.
// Mongoose: Ye MongoDB (database) se baat karne ka zariya hai.
// Cors: Ye permission deta hai ke frontend aur backend ek dusre se baat kar saken.
// Multer: Ye computer mein images/files save karne ke kaam aata hai.
// Path aur FS: Ye folder banane aur file ki location dhoondne mein madad karte hain.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');

// Purane models ko bula rahe hain (Order aur Feedback ki files)
const Order = require('./models/Order');
const Feedback = require('./models/Feedback');

// Humne apni website ka server "claApp" ke naam se shuru kar rahy
const claApp = express();

// Ye line kehti hai ke agar koi data bhej raha hai to usay JSON format mein samjho
claApp.use(express.json());
// Ye line sab ko ijazat deti hai ke hamare server se connect ho saken
claApp.use(cors());

// --- 1. IMAGES BHAJNE KA INTEZAM ---

// Hum check kar rahe hain ke 'uploads' wala folder bana hua hai?
const imagesFolder = 'uploads';
if (!fs.existsSync(imagesFolder)) {
    // Agar folder nahi hai to ye line naya folder bana degi
    fs.mkdirSync(imagesFolder); 
}

// Ye line kehti hai ke 'uploads' folder mein jo bhi hai wo sab ko dikha sakte hain
claApp.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer ko bata rahe hain ke file ka naam kya rakhna hai aur kahan save karni hai
const fileConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Is folder mein file jayegi
    },
    filename: (req, file, callback) => {
        // File ka naam "aaj ka time + purana naam" mila kar banao taake koi mix na ho
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const uploader = multer({ storage: fileConfig });

// --- 2. DATABASE SE DOSTI (CONNECTION) ---

// Ye hamare database ka pata (address) hai
const dbLink = "mongodb://127.0.0.1:27017/cla_tech_db";

// Database se connect karne ki koshish kar rahe hain
mongoose.connect(dbLink)
    .then(() => console.log("Database was connected successfully ! ✅"))
    .catch(error => console.log("Database Error ❌: ", error));


// --- 3. ORDERS KI APIS  ---

// [POST] Jab koi naya order dega to ye hissa chalega
claApp.post('/api/orders', uploader.single('payment_screenshot'), async (req, res) => {
    try {
        // Customer ka sara data ek jagah jama kar rahay hain
        const orderDetails = {
            customerName: req.body.customerName,
            city: req.body.city,
            address: req.body.address,
            total: req.body.total,
            // Agar screenshot bheja hai to uska rasta (path) likho
            screenshot: req.file ? req.file.path : null 
        };

        const newOrder = new Order(orderDetails);
        await newOrder.save(); // Database mai mein order save ho gaya
        
        res.status(201).json({ message: "orer has been done successfully", data: newOrder });
    } catch (err) {
        res.status(400).json({ error: "Error: " + err.message });
    }
});

// [GET] Admin ko saray orders dikhane ke liye
claApp.get('/api/orders', async (req, res) => {
    try {
        // Saray orders dhondo aur date ke hisab se line mein lagao
        const allOrders = await Order.find().sort({ date: -1 });
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// [PUT] Jab humein order ka status badalna ho (jaise: Order mil gaya ya bhej diya)
claApp.put('/api/orders/:id/status', async (req, res) => {
    try {
        const orderId = req.params.id; // Kaunsa order hai?
        const newStatus = req.body.status; // Naya status kya hai?

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: newStatus },
            { new: true } 
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: "Status not change: " + err.message });
    }
});

// [DELETE] Ghalat order ko khatam karne ke liye
claApp.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order permanently deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- 4. FEEDBACK  ---

// [POST] Jab koi humein message bhejta hai Contact Us se
claApp.post('/api/feedback', async (req, res) => {
    try {
        const userMessage = new Feedback({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        
        await userMessage.save(); // Message save ho gaya
        res.status(201).json({ success: true, message: "Message recieve!" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// [GET] Admin panel par saray messages check karne ke liye
claApp.get('/api/feedback', async (req, res) => {
    try {
        const messageList = await Feedback.find().sort({ date: -1 });
        res.status(200).json(messageList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// [DELETE] Purane message ko delete karne ke liye
claApp.delete('/api/feedback/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: "Feedback delete" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SERVER START ---
const SERVER_PORT = 5000;
claApp.listen(SERVER_PORT, () => console.log(`Your server ${SERVER_PORT} has been done! 🚀`));
