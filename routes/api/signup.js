const router = require("express").Router();
const passport = require("passport");
const Account = require("../../models/account");

// Matches with "/api/signup"
router.route("/")
    .get(function(req, res) {
        // GET route doesn't do anything
        res.json(true);
    })
    .post(function(req, res) {
        Account.register(new Account({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email
        }),
        req.body.password,
        function(err, account) {
            if (err) {
                console.log(err);
                return;
            }
            passport.authenticate("local")(req, res, function() {
                res.json(true);
            });
        });
    });

module.exports = router;
