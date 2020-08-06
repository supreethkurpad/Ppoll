//jshint esversion: 6
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/user');


var User = mongoose.model("User");
router.post("/api/signup", (req, res) => {
    let { username, email, password } = req.body;
    username = username.trim();
    if (!username || !password || !email)
        return res.json({ error: "Enter all fields." });
    if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        return res.json({ error: "Enter valid email address" });
    User.findOne({ username }, function (err, userfound) {
        if (userfound)
            return res.json({ error: "Username already taken. Choose unique username." });
        bcrypt.hash(password, 10, (err, hash) => {
            if (!err) {
                var user = new User({
                    username,
                    email,
                    password: hash
                });
                user.save().then(() => {
                    return res.json({ message: "Done." });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                console.log(err);
            }
        });
    });
});

module.exports = router;