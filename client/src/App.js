import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NoMatch from "./pages/NoMatch";

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

export default App;
