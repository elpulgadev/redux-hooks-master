import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFirstName, updateLastName } from "../redux/actions";

const Form = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.nameReducer.firstName);
  const lastName = useSelector((state) => state.nameReducer.lastName);
  const message = useSelector((state) => state.nameReducer.message);

  const handleClick = () => {
    setCount(count + 1);
  }

  const handleFirstName = () => {
    dispatch(updateFirstName("Jason"));
  };

  const handleLastName = () => {
    dispatch(updateLastName("Stathan"));
  };

  const handleReset = () => {
    dispatch({ type: "", action: {} });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div>{count}</div>
        <button onClick={handleClick}>Increase</button>

        <label>First Name : {firstName}</label>
        <button onClick={handleFirstName}>Update First Name</button>
        <br />
        <br />
        <label>Last Name : {lastName}</label>
        <button type="submit" onClick={handleLastName}>
          Update Last Name
        </button>

        <br />
        <br />
        <br />

        {message && (
          <label style={{ background: "lightgreen" }}>{message}</label>
        )}

        <br />

        <button
          style={{ background: "red" }}
          type="submit"
          onClick={handleReset}
        >
          Reset
        </button>

        <a
          href="https://github.com/Bilal-Bangash"
          target="_blank"
          rel="noopener noreferrer"
        >
          MADE BY M Bilal Bangash
        </a>
      </div>
    </React.Fragment>
  );
};

export default Form;
