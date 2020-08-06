//jshint esversion: 6
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.json({ error: "You need to be logged in" });
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
        if (err) {
            return res.json({ error: "You have to be signed in to access." });
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            req.user.password = "";
            next();
        });
    });
};


