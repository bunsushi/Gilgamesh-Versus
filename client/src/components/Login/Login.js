import React, { Component } from "react";

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

    render() {
        return (
            <div className="login">
                <form id="signup" name="signup" method="POST" action="/api/signup">
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
                        <input className="btn" type="submit" id="btn-login" value="Play!" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
