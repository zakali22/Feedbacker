import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
// reduxForm acts like connect(). It allows us to connect to the store and the reduxForm reducers/actions
import { Link } from "react-router-dom";
import SurveyFields from "./SurveyFields";

// Import the validateEmails function
import validateEmails from "../../utils/validateEmails";

// To render all the seperate fields concisely
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

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <h3>Create a Survey</h3>
        <form onSubmit={this.props.handleSubmit(this.props.showReview)}>
          {FIELDS.map((field, index) => {
            return (
              <Field
                key={index}
                type={field.type}
                name={field.name}
                label={field.label}
                component={SurveyFields}
              />
            );
          })}
          <Link to={"/surveys"}>
            <button className="btn-flat left red white-text">
              Cancel
              <i class="material-icons left">arrow_back</i>
            </button>
          </Link>
          <button className="btn-flat right teal white-text" type="submit">
            Next
            <i class="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
