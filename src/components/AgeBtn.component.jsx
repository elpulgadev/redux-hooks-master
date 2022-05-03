
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateAge } from "../redux/actions";

const AgeBtn = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const handleClick = () => {
    setCount((prev) => prev + 1);
    dispatch(updateAge(count));
  };

  return <button onClick={handleClick}>Increase age</button>;
};

export default AgeBtn;
