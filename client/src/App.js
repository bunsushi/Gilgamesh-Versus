import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/menu" component={Menu} />
        {/* // TODO: protect the game route */}
        <Route exact path="/game" component={Game} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
