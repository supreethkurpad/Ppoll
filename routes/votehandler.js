//jshint esversion : 6
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tokenCheck = require('../middleware/tokenCheck');
const Poll = mongoose.model("Poll");

router.post("/api/votehandler", tokenCheck, (req, res) => {
    let { pollId, option } = req.body;
    option--;

    Poll.findById(pollId).then(data => {
        const { usersVoted } = data;
        if (usersVoted.includes(req.user.username)) {
            return res.json({ error: "You have already voted on this poll." });
        } else {
            Poll.updateOne({ _id: pollId },
                { $inc: { [`votes.${option}`]: 1 }, $push: { 'usersVoted': req.user.username } }
            ).then(() => {
                Poll.findById(pollId).then(poll => {
                    return res.json(poll);
                })
            }).catch(err => console.log(err));
        }
    })
});





module.exports = router;