import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { withRouter } from "react-router-dom";

const SurveyReview = props => {
  const FIELDS = [
    {
      type: "text",
      name: "title",
      label: "Survey Title",
      noValueError: "You must provide a title"
    },
    {
      type: "text",
      name: "subject",
      label: "Survey Subject",
      noValueError: "You must provide a subject"
    },
    {
      type: "text",
      name: "body",
      label: "Survey Body",
      noValueError: "You must provide a body"
    },
    {
      type: "text",
      name: "recipients",
      label: "Recipients",
      noValueError: "You must provide a recipients list"
    }
  ];

  return (
    <div>
      <h1>Review your survey</h1>
      {FIELDS.map((field, index) => {
        return (
          <div key={index} style={{ margin: "20px 0px" }}>
            <label>{field.label}</label>
            <div>{props.formValues[field.name]}</div>
          </div>
        );
      })}
      <button
        className="yellow darken-3 btn-flat left white-text"
        onClick={props.showForm}
      >
        Back
        <i class="material-icons left">arrow_back</i>
      </button>
      <button
        onClick={() => props.submitForm(props.formValues, props.history)}
        className="green darken-3 btn-flat right white-text"
      >
        Submit
        <i class="material-icons right">check</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyReview));
