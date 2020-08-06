//jshint esversion:6
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('../models/user');
var User = mongoose.model("User");

router.post("/api/signin", (req, res) => {
    let { username, password } = req.body;
    if (!username || !password)
        return res.json({ error: "Enter all fields" });
    username = username.trim();
    User.findOne({ username }, (err, user) => {
        if (!user) {
            return res.json({ error: "User not registered." });
        }
        bcrypt.compare(password, user.password, (err, match) => {
            if (match) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
                const { _id, username } = user;
                res.json({ token, user: { _id, username } });
            } else {
                res.json({ error: "Wrong Password." });
            }
        });
    });
});





module.exports = router;