import React  from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage"
import PrivateRoute from "./components/PrivateRoute"
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
                {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path ="/protected" component = {BubblePage}/>
        <Route path="/" component={Login} />
        <Redirect to = "/login"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
