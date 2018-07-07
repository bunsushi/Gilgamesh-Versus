import axios from "axios";

export default {
    // Gets user information
    getUser: function() {
        return axios.get("/api/check/user");
    },
    // Gets user authentication status
    getAuthStatus: function() {
        return axios.get("/api/check/auth");
    },
    // Registers a new user in the DB
    signupUser: function(signupData) {
        return axios.post("/api/signup", signupData);
    },
    // Authenticates an existing user in the DB
    signinUser: function(signinData) {
        return axios.post("/api/signin", signinData);
    },
    // Signs out the current user
    signoutUser: function() {
        return axios.get("/api/signout");
    }
};
