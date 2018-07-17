import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import API from "../../utils/API";

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            proceedToLoad: false
        };
    }

    mounted = false;

    async componentDidMount() {
        this.mounted = true;
        const isAuthed = await this.getAuthStatus();
        if (this.mounted) this.setState({ isAuthenticated: isAuthed });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async getAuthStatus() {
        let res = await API.getAuthStatus();
        console.log(res);
        let returnVal = await res.data;
        console.log(returnVal);
        this.setState({ proceedToLoad: true });
        return returnVal;
    }
    
    render() {
        const { path, component } = this.props;

        if (this.state.isAuthenticated && this.state.proceedToLoad) {
            return (
                <Route exact path={path} component={component} />
            );
        }
        else {
            return (
                // <Redirect to="/" />
                <div>Not isAuthenticated!!</div>
            );
        }
    }
}

export default PrivateRoute;
