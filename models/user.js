//jshint esversion: 6
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

mongoose.model("User", userSchema);
