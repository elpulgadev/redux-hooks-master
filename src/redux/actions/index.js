import { SET_FIRST_NAME, SET_LAST_NAME, SET_AGE, SET_COUNT } from "../types";

export const updateFirstName = (firstName) => (dispatch, getState) => {
  try {
    dispatch({
      type: SET_FIRST_NAME,
      payload: {
        firstName,
        message: `Update Firstname ${
          getState().nameReducer.firstName
        } to ${firstName} `,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateLastName = (lastName) => (dispatch, getState) => {
  try {
    dispatch({
      type: SET_LAST_NAME,
      payload: {
        lastName,
        message: `Update Lastname ${
          getState().nameReducer.lastName
        } to ${lastName} `,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateAge = (age) => (dispatch) => {
  try {
    dispatch({
      type: SET_AGE,
      payload: {
        age,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateCount = (count) => (dispatch) => {
  try {
    dispatch({
      type: SET_COUNT,
      payload: {
        count,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
