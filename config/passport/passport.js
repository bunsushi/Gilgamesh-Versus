const Account = require("../../models/account");

module.exports = function(passport, LocalStrategy) {
    // Create a new instance of the LocalStrategy
    passport.use(new LocalStrategy(Account.authenticate()));

    // Serialize user for session
    passport.serializeUser(Account.serializeUser());

    // Deserialize user after session
    passport.deserializeUser(Account.deserializeUser());
};
