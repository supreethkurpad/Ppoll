//jshint esversion: 6
const mongoose = require('mongoose');
const express = require('express');
const tokenCheck = require('../middleware/tokenCheck');
const router = express.Router();
require('../models/user');
const User = mongoose.model("User");
require('../models/poll');
const Poll = mongoose.model("Poll");

router.get("/api/mypolls", tokenCheck, (req, res) => {
    Poll.find({ "postedBy": req.user }).then(polls => {
        return (res.json({ polls, user: req.user.username }))
    }).catch(err => console.log(err));
});

router.get("/api/users/:id", tokenCheck, (req, res) => {
    Poll.find({ "postedBy": req.params.id, "public": true }).populate("postedBy", "_id username").then(polls => {
        return (res.json({ polls, user: polls[0].postedBy.username }))
    }).catch(err => console.log(err));
});

module.exports = router;