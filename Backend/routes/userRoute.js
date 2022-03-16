const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs')


//register a user

router.post("/register", async(req, res) => {
    try {
        //hased password
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(req.body.password, salt);
        //new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hasedPassword
        });
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch (error) {
        res.status(500).json(error);
    }
})

//login user

router.post("/login", async(req, res) => {
    try {
        //get user detail
        const getUser = await User.findOne({
            username: req.body.username,
            // validatePassword: bcrypt.compare(req.body.password, getUser.password)
        });
        if (!getUser) {
            return res.status(400).json("Wrong credential")
        }

        //validation
        const validatePassword = await bcrypt.compare(req.body.password, getUser.password);

        if (!validatePassword) {
            return res.status(400).json("Wrong credential")
        }

        //successfully login
        res.status(200).json(getUser);
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;