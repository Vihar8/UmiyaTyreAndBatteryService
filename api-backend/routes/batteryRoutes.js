const express = require('express');
const router = express.Router();
const Batterys = require('../models/battery');
const upload = require('../multerConfig');

// POST route to upload battery details and image
router.post('/batterysdetails', upload.single('image'), async (req, res) => {
    try {
        const { name, type, size } = req.body; // Ensure size is being extracted

        // Check if the image file was uploaded
        const image =  req.file ? req.file.originalname : '' // Store the file path or URL
        
        // Ensure all required fields are provided
        if (!name || !type || !size || !image) {
            return res.status(400).json({ error: 'Please provide all required fields: name, type, size, and image.' });
        }

        // Create a new Battery entry
        const newData = new Batterys({
            name,
            type,
            size, // Ensure size is included here
            image: image
        });

        console.log('Battery data being saved:', newData);
        const response = await newData.save();
        
        res.status(201).json({ message: 'Battery details and image uploaded successfully', battery: response });
    } catch (error) {
        console.error('Error while saving battery details:', error);
        res.status(500).json({ error: 'Server error while saving battery details' });
    }
});

// GET route to retrieve battery details
router.post('/', async (req, res) => {
    try {
        const batteryData = await Batterys.find();
        console.log('Battery data retrieved');
        res.status(200).json(batteryData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
