// pass in some data to identify if user logged in and returned from api
export default function(state = [], action) {
  switch (action.type) {
    case "FETCH_SURVEYS":
      return action.payload; // This is the state that is assigned
    default:
      return state;
  }
}
