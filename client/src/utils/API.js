import axios from "axios";

export default {
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
