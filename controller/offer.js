const express = require('express');
const router = express.Router();
const offersModel = require("../model/offers_model").default;
const { mongo } = require('mongoose');

router.get('/offers', async (req, res) => {
    const { id, name, sortName } = req.query; // Accept both _id and name filters

    try {
        const filter = {};
        const sort = {};

        // Filter by _id if provided
        if (id) {
            // filter based on id being a valid ObjectId or a string
            const mongoose = require('mongoose');
            // Check if id is valid ObjectId
            if (mongoose.Types.ObjectId.isValid(id)) {
                filter._id = new mongoose.Types.ObjectId(id);
            } else {
                // Treat as string _id (if stored that way)
                filter._id = id;
            }
        }

        // --- Name filter (supports exact and partial search) ---
        if (name) {
            // Trim and escape special regex characters in the input
            const sanitizedInput = name.trim().replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");

            // Default to partial match if no specific match type is provided
            const isExactMatch = false; // Set to true for exact match, false for partial

            // Construct the regex pattern based on match type
            const regexPattern = isExactMatch ? `^${sanitizedInput}$` : sanitizedInput;

            // Apply the regex filter
            filter.name = { $regex: regexPattern, $options: "i" };
        }

        // Sort by name if requested
        if (sortName) {
            sort.name = 1; // ascending
        }

        const response = await offersModel.find(filter).sort(sort);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch offers' });
    }
});

router.post('/offers', async (req, res) => {
    try {
        const newOffer = new offersModel(req.body);
        const response = await newOffer.save();
        res.status(201).json({ message: 'Offer created successfully', data: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/offers/:id', async (req, res) => {
    try {
        const offer = await offersModel.findOne({ id: req.params.id });
        if (!offer) {
            return res.status(404).json({ error: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the offer' });
    }
});

router.patch('/offers/:id', async (req, res) => {
    try {
        const response = await offersModel.updateOne({ id: req.params.id }, { $set: req.body });
        res.status(200).json({ message: 'Offer updated successfully', response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/offers/:id', async (req, res) => {
    try {
        const response = await offersModel.deleteOne({ id: req.params.id });
        res.status(200).json({ message: 'Offer deleted successfully', response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the offer' });
    }

});
module.exports = router;