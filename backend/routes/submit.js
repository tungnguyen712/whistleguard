const express = require("express");
const { v4: uuidv4 } = require('uuid');
const categorize = require('../services/categorize');
const reportService = require('../services/reportService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        // validate input
        if (!title) {
            return res.status(400).json({ error: 'Title is required'})
        }

        // generate a unique token for the report
        const token = uuidv4();

        // categorize report using AI
        const category = await categorize(title);

        // save to dynamodb
        await reportService.createReport({
            token,
            title,
            description,
            category,
        });

        // return token to frontend
        return res.status(201).json({ token, category});
        
    } catch (error) {
        console.log('Error in /submit route:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}); 

module.exports = router;