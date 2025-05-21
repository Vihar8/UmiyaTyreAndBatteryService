const express = require('express');
const router = express.Router();
const Oils = require('../models/oil'); // Import the Oils schema
const upload = require('../multerConfig'); // Multer configuration

// POST route to upload oil details and image
router.post('/oilsdetails', upload.single('image'), async (req, res) => {
    try {
        const { name, type } = req.body;

        // Check if the image file was uploaded
        const image = req.file ? req.file.originalname : '' // Store the file path or URL
        
        // Ensure all required fields are provided
        if (!name || !type || !image) {
            return res.status(400).json({ error: 'Please provide all required fields: name, type, and image.' });
        }

        // Create a new Oils entry
        const newData = new Oils({
            name,
            type,
            image: image
        });

        console.log('Oil data being saved:', newData);
        const response = await newData.save();
        
        res.status(201).json({ message: 'Oil details and image uploaded successfully', oils: response });
    } catch (error) {
        console.error('Error while saving oil details:', error);
        res.status(500).json({ error: 'Server error while saving oil details' });
    }
});

router.post('/', async(req, res) => {
    try{
        const oilData = await Oils.find();
        console.log('data Fetched')
        res.status(200).json(oilData)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
})


module.exports = router;
