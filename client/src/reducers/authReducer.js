import { FETCH_USER } from "../actions/types";

// pass in some data to identify if user logged in and returned from api
export default function(state = null, action) {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload || false; // This is the state that is assigned
    default:
      return state;
  }
}
