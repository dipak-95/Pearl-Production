const express = require('express');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL    = 'amit@pearl.com';
const ADMIN_PASSWORD = 'Amit@123';
const ADMIN_TOKEN    = 'pearl-admin-secure-2026';

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({
            success: true,
            token: ADMIN_TOKEN,
            admin: { name: 'Amit', email: ADMIN_EMAIL }
        });
    }
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
});

// POST /api/auth/verify — check token validity
router.post('/verify', (req, res) => {
    const { token } = req.body;
    if (token === ADMIN_TOKEN) {
        return res.json({ success: true, admin: { name: 'Amit', email: ADMIN_EMAIL } });
    }
    return res.status(401).json({ success: false, message: 'Token invalid' });
});

module.exports = router;
