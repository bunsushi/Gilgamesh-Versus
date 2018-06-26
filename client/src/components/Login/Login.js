import React from "react";

const Login = props => (
    <div className="login">
        <form id="signup" name="signup" method="POST" action="/signup">
            <div className="form-options">
                <div className="form-pill" id="login"><h1>log in</h1></div>
                <div className="form-pill" id="sign-up"><h1>sign up</h1></div>
            </div>
            <div className="form-group">
                <label></label>
                <input type="text" id="username" name="username" placeholder="username" />
                <br />
                <label></label>
                <input type="password" id="password" name="password" placeholder="password" />
                <br />
                <input className="btn" type="submit" id="btn-login" value="Play!" />
            </div>
        </form>    </div>
);

export default Login;