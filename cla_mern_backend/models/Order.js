// Mongoose ko bula rahay hain taake database ka naksha (Schema) bana saken
const mongoose = require('mongoose');

// --- DATABASE KA NAKSHA (ORDER SCHEMA) ---
// Ye ek kism ka "Form" hai jo batata hai ke ek order mein kya kya hona chahiye
const orderSchema = new mongoose.Schema({
    // Customer ka naam (Text format mein)
    customerName: {
        type: String,
        required: true // Ye likhna lazmi hai
    },
    // City naam
    city: {
        type: String,
        required: true
    },
    // Address
    address: {
        type: String,
        required: true
    },
    // Order ka total bill 
    total: {
        type: Number,
        required: true
    },
    // Screenshot ka rasta (Path) jahan photo save hui hai
    screenshot: {
        type: String 
    },
    // Order ka status (Ke abhi pending hai ya bhej diya gaya)
    status: {
        type: String,
        default: 'Pending' // Jab naya order aayega, khud hi 'Pending' likha aayega
    },
    // Kis time par order aaya (Computer khud aaj ka waqt daal dega)
    date: { 
        type: Date, 
        default: Date.now 
    }
});

// Is nakshay ko "Order" ke naam se export kar rahay hain taake server isay use kar sakay
module.exports = mongoose.model('Order', orderSchema);