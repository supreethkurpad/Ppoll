const express = require('express');
const tokenCheck = require('../middleware/tokenCheck');
const mongoose = require('mongoose');
const router = express.Router();
require('../models/poll');


router.post("/api/deletepoll", tokenCheck, (req, res) => {
    const id = req.body.id;
    const Poll = mongoose.model("Poll");


    Poll.deleteOne({ _id: id }).then((deleted) => {
        if (deleted.deletedCount == 1)
            return res.json({ message: "Deleted Poll" })
        else
            return res.json({ error: "Unable to delete poll" })
    })
})

module.exports = router;