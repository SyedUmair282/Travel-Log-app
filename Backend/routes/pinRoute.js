const express = require('express');
const router = express.Router();
const Pin = require('../models/pin');


//create a pin

router.post("/", async(req, res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all pin

router.get("/", async(req, res) => {
    try {
        const getPins = await Pin.find();
        res.status(200).json(getPins);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;