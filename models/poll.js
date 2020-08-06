//jshint esversion: 6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const pollSchema = new Schema({
    title: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    public: {
        type: Boolean,
        default: true,
        required: false
    },
    votes: [],
    usersVoted: []
});

mongoose.model("Poll", pollSchema);