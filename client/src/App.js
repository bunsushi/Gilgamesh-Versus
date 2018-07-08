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
  // isAuthenticated: false,
  async getAuthStatus() {
    let res = await API.getAuthStatus();
    await console.log(res);
    let returnVal = await res.data;
      // .then(res => {
        // console.log(res);
        // if (res.data) {
        //   console.log("Authenticated!");
        //   console.log(res.data);
        //   return true;
        // }
        // else {
        //   console.log("Not authenticated!");
        //   console.log(res.data);
        //   return false;
        // }
      // })
      // .catch(err => console.log(err));
    console.log(returnVal);
    return returnVal;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    realAuth.getAuthStatus() === true
      ? <Component {...props} />
      : <Redirect to="/" />
  )} />
);

export default App;
