import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";

class SurveyNew extends Component {
  // Decide what to show based on state
  state = {
    showReview: false
  };

  renderForm() {
    if (this.state.showReview) {
      return (
        <SurveyReview
          showForm={() => {
            this.setState({
              showReview: false
            });
          }}
        />
      );
    }

    return (
      <SurveyForm
        showReview={() => {
          this.setState({
            showReview: true
          });
        }}
      />
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default SurveyNew;
