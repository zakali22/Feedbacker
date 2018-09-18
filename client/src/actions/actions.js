import axios from "axios";

// To grab the current online user
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current");
  console.log(res.data);
  dispatch({
    type: "FETCH_USER",
    payload: res.data
  });
};

// To handle the token sent back by Stripe API
export const stripeToken = token => async dispatch => {
  const res = await axios.post("api/stripeHandler", token);
  console.log(res.data);
  dispatch({
    type: "FETCH_USER",
    payload: res.data
  });
};

export const submitForm = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);
  console.log(res.data);
  history.push("/surveys");
  dispatch({
    type: "FETCH_USER",
    payload: res.data
  });
};

export const getSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({
    type: "FETCH_SURVEYS",
    payload: res.data
  });
};
