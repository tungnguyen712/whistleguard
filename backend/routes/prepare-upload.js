const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { createStub } = require('../services/reportService');
const { getUploadUrl } = require('../utils/s3');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let { fileName, token } = req.body;
        if (!fileName) {
            return res.status(400).json({ error: 'File name is required' });
        }

        if (!token) {
            token = uuidv4();
        }

        const fileKey = `uploads/${token}/${Date.now()}_${fileName}`
        const uploadUrl = await getUploadUrl(token, fileName);
        await createStub(token, `uploads/${token}/${Date.now()}_${fileName}`);

        res.json({
            token,
            uploadUrl,
            fileKey
        })
        
    } catch (error) {
        console.error('Error preparing upload:', error);
        res.status(500).json({ error: 'Could not prepare upload' });
    }
});

module.exports = router;