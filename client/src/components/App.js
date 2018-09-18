import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import { connect } from "react-redux";

// Import the routes
import Header from "./Header";
import Dashboard from "./Dashboard";
import SurveyNew from "./Survey/SurveyNew";
const Landing = () => <h1>Landing</h1>;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path={"/"} component={Landing} />
              <Route exact path={"/surveys"} component={Dashboard} />
              <Route exact path={"/surveys/new"} component={SurveyNew} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
console.log(`Stripe key is ${process.env.REACT_APP_STRIPE_KEY}`);
