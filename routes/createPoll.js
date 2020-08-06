//jshint esversion:6
const express = require('express');
const mongoose = require('mongoose');
const tokenCheck = require('../middleware/tokenCheck');
const router = express.Router();
const Poll = mongoose.model("Poll");
const User = mongoose.model("User");

router.post("/api/createpoll", tokenCheck, (req, res) => {
    let newid = "";
    const { title, option1, option2, option3, option4, public } = req.body;

    if (!title || !option1 || !option2 || !option3 || !option4)
        return res.json({ error: "Enter all fields" });

    const newPoll = new Poll({
        title,
        option1, option2, option3, option4,
        postedBy: req.user,
        public,
        votes: [0, 0, 0, 0]
    });

    newPoll.save(function (err, obj) {
        if (err)
            console.log(err);
        else {
            newid = obj._id;
            return res.json({ message: "done", id: newid });
        }
    });
});

module.exports = router;