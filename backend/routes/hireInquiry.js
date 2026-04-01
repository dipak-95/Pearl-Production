const express = require('express');
const router  = express.Router();
const HireInquiry = require('../models/HireInquiry');

// POST — Submit hire inquiry (from website)
router.post('/', async (req, res) => {
    try {
        const inquiry = new HireInquiry(req.body);
        await inquiry.save();
        res.json({ success: true, message: 'Hire inquiry submitted!', inquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET — All hire inquiries (admin)
router.get('/', async (req, res) => {
    try {
        const inquiries = await HireInquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET — Stats
router.get('/stats', async (req, res) => {
    try {
        const total     = await HireInquiry.countDocuments();
        const confirmed = await HireInquiry.countDocuments({ status: 'confirmed' });
        const pending   = await HireInquiry.countDocuments({ status: 'pending' });
        const revAgg    = await HireInquiry.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const revenue = revAgg.length ? revAgg[0].total : 0;
        res.json({ success: true, stats: { total, confirmed, pending, revenue } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PATCH — Confirm with amount
router.patch('/:id/confirm', async (req, res) => {
    try {
        const { amount } = req.body;
        const inquiry = await HireInquiry.findByIdAndUpdate(
            req.params.id,
            { status: 'confirmed', amount: Number(amount) || 0, confirmedAt: new Date() },
            { new: true }
        );
        if (!inquiry) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, inquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PATCH — Reject
router.patch('/:id/reject', async (req, res) => {
    try {
        const inquiry = await HireInquiry.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.json({ success: true, inquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await HireInquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
