const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { saveOrganization, getOrganizationByEmail, getOrganizationById } = require("../services/orgService");
const { getAllReports } = require("../services/reportService");
const { getDownloadUrl } = require("../utils/s3");
const { categoryRoute } = require("../services/categorize");

const router = express.Router();

router.options('/signup', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST'
  }).sendStatus(200);
});

// POST /org/signup
router.post('/signup', async (req, res) => {
    try {
        const { orgName, email, password, orgTypes, otherOrgType } = req.body;

        console.log('Received signup request body:', req.body);

        if (!orgName || !email || !password || !orgTypes || orgTypes.length === 0) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("Checking for existing email: ", email);
        const existing = await getOrganizationByEmail(email);
        console.log("Existing organization found:", existing);
        if (existing) {
            return res.status(409).json({ error: "Email already exists"});
        }

        const orgId = uuidv4();

        const org = {
            orgId,
            orgName,
            email,
            password,
            orgTypes,
            otherOrgType: orgTypes.includes("Other") ? otherOrgType : undefined
        };

        console.log("Saving org:", org);

        await saveOrganization(org);
        
        res.status(201).json({ message: "Organization signed up successfully", orgId });

    } catch (error) {
        console.error('Error in /org/signup route:', error);
        return res.status(500).json({ error: "Failed to create organization" });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received email and password');

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        console.log("Querying for email: ", email);
        const org = await getOrganizationByEmail(email);
        console.log("Organization found:", org);
        if (!org || org.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Signed in successful", orgId: org.orgId });
    } catch (error) {
        console.error('Error in /org/signin route:', error);
        res.status(500).json({ error: "Failed to sign in" });
    }
})

router.get('/reports', async (req, res) => {
    const { orgId } = req.query;
    if (!orgId) {
        return res.status(400).json({ error: "Organization ID is required" });
    }

    try {
        const org = await getOrganizationById(orgId);
        if (!org) {
            return res.status(404).json({ error: "Organization not found" });
        }

        const reports = await getAllReports();

        const categoryMap = {};
        categoryRoute.forEach(category => categoryMap[category.name] = category.routeTo);

        const filteredReports = reports.filter(report => {
            const mappedOrgType = categoryMap[report.category];
            return org.orgTypes.includes(mappedOrgType);
        });

        res.status(200).json(filteredReports);

    } catch (error) {
        console.error('Error in /org/reports route:', error);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
});

router.get('/report-file', async (req, res) => {
    const { fileKey } = req.query;
    if (!fileKey) {
        return res.status(400).json({ error: "File key is required" });
    }
    console.log('Received file key:', fileKey);

    try {
        const url = await getDownloadUrl(fileKey);
        res.status(200).json({ url });
    } catch (error) {
        console.log('Error in /org/report-file route:', error);
        res.status(500).json({ error: "Failed to get file download URL" });
    }
});

module.exports = router;