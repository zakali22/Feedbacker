import React, { Component } from "react";
import GoogleLogo from "../images/googlelogo.png";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

import Payments from "./Payments";

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  conditionalRendering = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">
              <img
                style={{ float: "right", marginTop: "10px" }}
                src={GoogleLogo}
                width="50%"
                height="50%"
              />
            </a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{ margin: "0 10px" }}>
            Credit: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  };

  render() {
    return (
      <nav>
        <div class="nav-wrapper" style={{ padding: "0px 30px" }}>
          <a href={this.props.auth ? "/surveys" : "/"} class="brand-logo">
            Feedbacker
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            {this.conditionalRendering()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
