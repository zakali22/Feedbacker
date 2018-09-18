import React from "react";
import PropTypes from "prop-types";

const SurveyFields = ({ input, label, meta }) => {
  console.log(meta.error);
  return (
    <div style={{ marginTop: "10px" }}>
      <label>{label}</label>
      <input {...input} />
      <div style={{ color: "red", marginBottom: "20px" }}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
};

export default SurveyFields;
