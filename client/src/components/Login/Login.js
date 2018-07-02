import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import FormPill from "../FormPill";

class Login extends Component {

    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        formSignupStatus: true
    };

    handleFormStatus = event => {
        // Get the id of the clicked FormPill
        const formItemId = event.target.attributes.getNamedItem("id").value;
        // Clone this.state to the newState object
        const newState = { ...this.state };
        // Update newState depending which FormPill was clicked
        newState.formSignupStatus = (formItemId === "login") ? false : true;
        // Replace this.state with newState
        this.setState(newState);
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password && this.state.formSignupStatus) {
            API.signupUser({
                username: this.state.username,
                password: this.state.password
            })
                .then(res => {
                    this.props.history.push("/menu")
                })
                .catch(err => console.log(err));
        }
        else if (this.state.username && this.state.password && !this.state.formSignupStatus) {
            API.signinUser({
                username: this.state.username,
                password: this.state.password
            })
                .then(res => {
                    this.props.history.push("/menu")
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="login">
                <form id="signup" name="signup">
                    <div className="form-options">
                        <FormPill id="sign-up" onClick={this.handleFormStatus}><h1 id="sign-up">sign up</h1></FormPill>
                        <FormPill id="login" onClick={this.handleFormStatus}><h1 id="login">log in</h1></FormPill>
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

export default withRouter(Login);
