const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    xp: {
        type: Number,
        required: false,
        default: 0
    },
    achievements: {
        type: Number,
        required: false,
        default: 0
    },
    achvShield: {
        type: Boolean,
        required: false,
        default: true
    },
    achvTrophy22: {
        type: Boolean,
        required: false,
        default: false
    },
    achvCup: {
        type: Boolean,
        required: false,
        default: false
    },
    achvTrophy14: {
        type: Boolean,
        required: false,
        default: false
    },
    achvTrophy13: {
        type: Boolean,
        required: false,
        default: false
    },
    achvTrophy12: {
        type: Boolean,
        required: false,
        default: false
    },
    achvMedal5: {
        type: Boolean,
        required: false,
        default: false
    },
    achvRibbon: {
        type: Boolean,
        required: false,
        default: false
    },
    weapMace: {
        type: Boolean,
        required: false,
        default: false
    },
    weapHelmet: {
        type: Boolean,
        required: false,
        default: false
    },
    weapAxe3: {
        type: Boolean,
        required: false,
        default: false
    },
    weapShield: {
        type: Boolean,
        required: false,
        default: true
    },
    weapBowAndArrow: {
        type: Boolean,
        required: false,
        default: false
    },
    weapKnife: {
        type: Boolean,
        required: false,
        default: false
    },
    weapSword2: {
        type: Boolean,
        required: false,
        default: false
    },
    weapAxe1: {
        type: Boolean,
        required: false,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the above schema
const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
