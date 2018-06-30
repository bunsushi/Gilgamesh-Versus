const router = require("express").Router();
const passport = require("passport");
const Account = require("../../models/account");

// Matches with "/api/signup"
router.route("/")
    .get(function(req, res) {
        res.send("Route working");
    })
    .post(function(req, res) {
        Account.register(new Account({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
        },
        req.body.password,
        function(err, account) {
            if (err) {
                return res.json(err);
            }
            passport.authenticate("local")(req, res, function() {
                res.redirect("/menu");
            });
        }));
    });

module.exports = router;
