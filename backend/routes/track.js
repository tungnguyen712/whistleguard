const express = require('express');
const { getReportByToken } = require('../services/reportService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { token } = req.query;

        // validate input
        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }
        
        const report = await getReportByToken(token);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.json(report);
    } catch {
        console.error('Error in /track route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;