const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    xp: {
        type: Number,
        required: false
    },
    achievements: {
        type: Number,
        required: false
    },
    achvShield: {
        type: Boolean,
        required: false
    },
    achvTrophy22: {
        type: Boolean,
        required: false
    },
    achvCup: {
        type: Boolean,
        required: false
    },
    achvTrophy14: {
        type: Boolean,
        required: false
    },
    achvTrophy13: {
        type: Boolean,
        required: false
    },
    achvTrophy12: {
        type: Boolean,
        required: false
    },
    achvMedal5: {
        type: Boolean,
        required: false
    },
    achvRibbon: {
        type: Boolean,
        required: false
    },
    weapMace: {
        type: Boolean,
        required: false
    },
    weapHelmet: {
        type: Boolean,
        required: false
    },
    weapAxe3: {
        type: Boolean,
        required: false
    },
    weapShield: {
        type: Boolean,
        required: false,
        default: true
    },
    weapBowAndArrow: {
        type: Boolean,
        required: false
    },
    weapKnife: {
        type: Boolean,
        required: false
    },
    weapSword2: {
        type: Boolean,
        required: false
    },
    weapAxe1: {
        type: Boolean,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the above schema
const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
