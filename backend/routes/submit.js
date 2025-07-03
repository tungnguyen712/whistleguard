const express = require("express");
const { v4: uuidv4 } = require('uuid');
const categorize = require('../services/categorize');
const { updateReport } = require('../services/reportService');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('--- /submit route hit ---');
    try {
        const { token, title, description } = req.body;

        // validate input
        if (!title) {
            return res.status(400).json({ error: 'Title is required'})
        }

        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        // categorize report using AI
        const category = await categorize(title);

        console.log('Token: ', token);
        // save to dynamodb
        await updateReport(
            token,
            title,
            description,
            category,
        );

        // return token to frontend
        return res.status(200).json({ token, category});
        
    } catch (error) {
        console.log('Error in /submit route:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}); 

module.exports = router;