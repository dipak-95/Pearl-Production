const mongoose = require('mongoose');

const hireInquirySchema = new mongoose.Schema({
    // Who is asking
    clientName:  { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    // Which developer
    developerName: { type: String, required: true },
    developerRole: { type: String, required: true },
    hourlyRate:    { type: Number, required: true },
    // Project details
    projectDesc:   { type: String, required: true },
    estimatedHours:{ type: Number, default: 0 },
    // Admin fields
    status:    { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
    amount:    { type: Number, default: 0 },
    confirmedAt: { type: Date },
    createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('HireInquiry', hireInquirySchema);
