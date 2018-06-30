const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Incorporate password hashing/salting from passport-local-mongoose
accountSchema.plugin(passportLocalMongoose);

// Create the model from the above schema
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
