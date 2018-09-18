import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class Payments extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <StripeCheckout
          name="Feedbacker"
          description="$5 for 5 email credits"
          amount={500}
          token={token => this.props.stripeToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">Add credits</button>
        </StripeCheckout>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
