const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name:      { type: String, required: true },
    email:     { type: String, required: true },
    phone:     { type: String, required: true },
    service:   { type: String, required: true },
    message:   { type: String, required: true },
    status:    { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
    amount:    { type: Number, default: 0 },       // revenue added on confirm
    confirmedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
