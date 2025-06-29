const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { createStub } = require('../services/reportService');
const { getUploadUrl } = require('../utils/s3');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return res.status(400).json({ error: 'File name is required' });
        }

        const token = uuidv4();
        const uploadUrl = await getUploadUrl(token, fileName);
        await createStub(token, `uploads/${token}/${Date.now()}_${fileName}`);

        res.json({
            token,
            uploadUrl
        })
    } catch (error) {
        console.error('Error preparing upload:', error);
        res.status(500).json({ error: 'Could not prepare upload' });
    }
});

module.exports = router;