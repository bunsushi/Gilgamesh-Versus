import React, { Component } from "react";
import API from "../../utils/API";

class Login extends Component {

    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            API.signupUser({
                username: this.state.username,
                password: this.state.password
            })
                .then(res => res.json(true))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="login">
                <form id="signup" name="signup">
                    <div className="form-options">
                        <div className="form-pill" id="login"><h1>log in</h1></div>
                        <div className="form-pill" id="sign-up"><h1>sign up</h1></div>
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input className="form-control" type="text" id="username" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                        <br />
                        <label></label>
                        <input className="form-control" type="password" id="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange} />
                        <br />
                        <input className="btn" type="submit" id="btn-login" value="Play!" onClick={this.handleFormSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
