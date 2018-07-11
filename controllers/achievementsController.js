const db = require("../models");

// Defining methods for the controller
module.exports = {
    findAll: function(req, res) {
        db.Achievement
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Achievement
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Achievement
            .create(req)
            .then(function(dbModel) {
                return db.Account.findOneAndUpdate({ _id: req.user._id }, { achievement: dbModel._id }, { new: true });
            })
            .then(dbModel => res.json(dbModel))
            // .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Achievement
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Achievement
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
