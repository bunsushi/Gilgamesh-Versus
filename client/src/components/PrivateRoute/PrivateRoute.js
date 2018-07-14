import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import API from "../../utils/API";

class PrivateRoute extends Component {

    state = {
        isAuthenticated: false
    };

    componentDidMount() {
        this.getAuthStatus();
    };

    async getAuthStatus() {
        let res = await API.getAuthStatus();
        console.log(res);
        let returnVal = await res.data;
        console.log(returnVal);
        this.setState({ isAuthenticated: returnVal });
    }

    render() {
        const { path, component } = this.props;

        if (!this.state.isAuthenticated) {
            return (
                <Route exact path={path} component={component} />
            );
        }
        else {
            return (
                <Redirect to="/" />
            );
        }
    }
}

export default PrivateRoute;
