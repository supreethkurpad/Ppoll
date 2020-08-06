//jshint esversion : 6
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/poll');
const Poll = mongoose.model("Poll");
const tokenCheck = require('../middleware/tokenCheck');
router.get("/api/:pollid", tokenCheck, (req, res) => {
    const pollid = req.params.pollid;
    Poll.findById(pollid).populate("postedBy", "_id username").then(found => {
        req.user.password = "";
        res.json({ found, user: req.user })
    }).catch(err => console.log(err));
});



module.exports = router;