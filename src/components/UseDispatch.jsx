import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateFirstName, updateCount } from "../redux/actions";

const MyIncrementButton = React.memo(({ onIncrement }) => {
  console.log("MyIncrementButton");

  return <button onClick={onIncrement}>Increment counter</button>;
});

function Dispatch() {
  const count = useSelector((state) => state.nameReducer.count);
  const dispatch = useDispatch();

  const incrementCounter = useCallback(
    () => dispatch(updateCount(count + 1)),
    [dispatch]
  );

  const setName = useCallback(
    () => dispatch(updateFirstName("Elpulga")),
    [dispatch]
  );

  return (
    <>
      <h1>{count}</h1>
      <MyIncrementButton onIncrement={incrementCounter} />
      <button onClick={setName}>Set name</button>
    </>
  );
}

export default Dispatch;
