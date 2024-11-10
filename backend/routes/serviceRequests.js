const express = require('express');
const router = express.Router();
const Request = require('../models/Request'); // Ensure you have this model created

// POST route to handle service request submissions
router.post('/service-requests', async (req, res) => {
    const { name, email, service, details } = req.body;

    try {
        const newRequest = new Request({ name, email, service, message:details });
        await newRequest.save();
        res.status(201).json({ message: 'Service request submitted successfully!' });
    } catch (error) {
        console.error('Error saving service request:', error);
        res.status(500).json({ message: 'Error submitting request.' });
    }
});

// GET route for fetching all service requests
router.get('/service-requests', async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching service requests:', error);
        res.status(500).json({ message: 'Failed to fetch service requests.' });
    }
});

module.exports = router;
