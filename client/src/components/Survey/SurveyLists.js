import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class SurveyLists extends Component {
  componentDidMount() {
    this.props.getSurveys();
  }

  render() {
    console.log(this.props.surveys);
    return (
      <div>
        <h4>Survey Lists</h4>
        <div className="row" style={{ padding: 0, marginTop: "20px" }}>
          {this.props.surveys.map(survey => {
            return (
              <div className="col s12 m6">
                <div className="card" style={{ background: "#ee6e73" }}>
                  <div className="card-content white-text">
                    <span className="card-title">{survey.title}</span>
                    <p>{survey.subject}</p>
                  </div>
                  <div
                    className="card-action orange-text"
                    style={{ background: "grey", padding: "30px 0px" }}
                  >
                    <ul
                      style={{
                        width: "50%",
                        display: "block",
                        margin: "0 auto",
                        marginTop: "-10px"
                      }}
                    >
                      <li style={{ display: "inline", float: "left" }}>
                        Yes: {survey.yes}
                      </li>
                      <li style={{ display: "inline", float: "right" }}>
                        No: {survey.no}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    surveys: state.surveys
  };
};

export default connect(
  mapStateToProps,
  actions
)(SurveyLists);
