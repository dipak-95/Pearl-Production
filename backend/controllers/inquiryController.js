const Inquiry = require('../models/Inquiry');

exports.submitInquiry = async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            service,
            message
        });

        const savedInquiry = await newInquiry.save();
        res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', data: savedInquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while submitting inquiry', error: err.message });
    }
};

exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while fetching inquiries', error: err.message });
    }
};
