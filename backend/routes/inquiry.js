const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// POST — Create new inquiry (from website form)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        const inquiry = new Inquiry({ name, email, phone, service, message });
        await inquiry.save();
        res.json({ success: true, message: 'Inquiry saved!', inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// GET — All inquiries (for admin)
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET — Dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const total     = await Inquiry.countDocuments();
        const confirmed = await Inquiry.countDocuments({ status: 'confirmed' });
        const pending   = await Inquiry.countDocuments({ status: 'pending' });
        const revenueAgg = await Inquiry.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const revenue = revenueAgg.length ? revenueAgg[0].total : 0;
        res.json({ success: true, stats: { total, confirmed, pending, revenue } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PATCH — Confirm inquiry with amount
router.patch('/:id/confirm', async (req, res) => {
    try {
        const { amount } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            {
                status: 'confirmed',
                amount: Number(amount) || 0,
                confirmedAt: new Date()
            },
            { new: true }
        );
        if (!inquiry) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE — Remove inquiry
router.delete('/:id', async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Inquiry deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
