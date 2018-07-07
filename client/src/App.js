import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NoMatch from "./pages/NoMatch";
import API from "./utils/API";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/menu" component={Menu} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

const realAuth = {
  isAuthenticated: false,
  getAuthStatus() {
    API.getAuthStatus()
      .then(res => {
        console.log(res);
        if (res.data) {
          console.log("Authenticated!");
          this.isAuthenticated = true;
        }
        else {
          console.log("Not authenticated!");
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} onLoad={realAuth.getAuthStatus()} render={(props) => (
    realAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to="/" />
  )} />
);

export default App;
