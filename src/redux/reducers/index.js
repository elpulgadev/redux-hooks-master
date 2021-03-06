import { SET_FIRST_NAME, SET_LAST_NAME, SET_AGE, SET_COUNT } from "../types";

const INITIAL_STATE = {
  firstName: "Jason",
  lastName: "Doe",
  message: "",
  age: 1,
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case SET_LAST_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case SET_AGE:
      return {
        ...state,
        ...action.payload,
      }
    case SET_COUNT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return INITIAL_STATE;
  }
};
