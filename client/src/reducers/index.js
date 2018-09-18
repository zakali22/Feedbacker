import { combineReducers } from "redux";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  surveys: surveyReducer
  // The redux form will come with its own reducer and action to handle value changes and store it into the state
});
