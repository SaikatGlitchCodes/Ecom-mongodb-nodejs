const express = require('express');
const router = express.Router();
const offerModel = require("../model/offers_model");
const authenticationMiddleware = require("../middleware/auth");

router.get("/offers", authenticationMiddleware, async (req, res) => {
    console.log("Offers route")
    try {
        const response = await offerModel.find({});
        console.log("Response", response)
        res.status(200).json(response);
    } catch (err) {
        console.log("Error", err)
        res.status(401).json({ error: err });
    }
});

module.exports = router;