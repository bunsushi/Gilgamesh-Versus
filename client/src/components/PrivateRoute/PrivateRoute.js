import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import API from "../../utils/API";

class PrivateRoute extends Component {

    async getAuthStatus() {
        let res = await API.getAuthStatus();
        console.log(res);
        let returnVal = await res.data;
        console.log(returnVal);
        return returnVal;
    }

    renderContent(isAuthenticated) {
        const { path, component } = this.props;

        if (isAuthenticated) {
            return (
                <Route exact path={path} component={component} />
            );
        }
        else {
            return (
                <Redirect to="/" />
            );
        }
    };

    render() {
        const isAuthenticated = this.getAuthStatus();
        const content = this.renderContent(isAuthenticated);
        return content;
    }
}

export default PrivateRoute;
