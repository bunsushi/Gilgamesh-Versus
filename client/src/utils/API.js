import axios from "axios";

export default {
    // Registers a new user in the DB
    signupUser: function(signupData) {
        return axios.post("/api/signup", signupData);
    }
};
