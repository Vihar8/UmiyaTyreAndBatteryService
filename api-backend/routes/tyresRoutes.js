const express = require('express');
const router = express.Router();
const Tyres = require('../models/tyres'); // Import the Tyres schema
const upload = require('../multerConfig'); // Multer configuration

router.post('/tyresdetails', upload.single('image'), async (req, res) => {
    try {
        const { name, width, height, radius, brand, type } = req.body;

        // Get the uploaded image filename
        const image = req.file ? req.file.filename : '';

        // Construct size object directly
        const size = { width, height, radius };

        const existingTyre = await Tyres.findOne({
            name: name,
            'size.width': width,
            'size.height': height,
            'size.radius': radius
        });

        if (existingTyre) {
            return res.status(400).json({ error: 'Tyre with same name and size already exists' });
        }

        // Create a new Tyres document
        const newTyre = new Tyres({
            name,
            brand,
            type,
            size,
            image
        });


        // Save to database
        await newTyre.save();

        res.status(201).json({
            message: 'Tyre details and image uploaded successfully',
            tyre: newTyre
        });

    } catch (error) {
        console.error('Error while saving tyre details:', error);
        res.status(500).json({ error: 'Server error while saving tyre details' });
    }
});

router.post('/', async(req, res) => {
    try{
        const tyreData = await Tyres.find();
        console.log('data Fetched')
        res.status(200).json(tyreData)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports = router;
