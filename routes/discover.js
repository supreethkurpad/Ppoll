//jshint esversion: 6
const express = require('express');
const router = express.Router();
const tokenCheck = require('../middleware/tokenCheck');
const mongoose = require('mongoose');
const e = require('express');
const Poll = mongoose.model("Poll");

router.get("/api/discover", tokenCheck, (req, res) => {
    Poll.find({ public: true }).populate("postedBy", "_id username").then(posts => res.json({ posts }))
        .catch(err => console.log(err));
});

module.exports = router;