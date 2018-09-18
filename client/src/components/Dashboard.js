import React from "react";
import { Link } from "react-router-dom";
import SurveyLists from "./Survey/SurveyLists";

const Dashboard = props => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SurveyLists />
      <div className="fixed-action-btn">
        <Link to={"/surveys/new"} className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
