import { useState, useMemo } from "react";

function useIndexCount(arr_length = 0) {
  const [index, setIndex] = useState(0);
  const length = useMemo(() => arr_length, [arr_length]);
  // const length = useState(arr_length);
  // const length = arr_length;

  const moveIndex = (direction) => {
    setIndex(
      (i) =>
        (direction === 0 ? 0 : ((i + direction) % length) + length) % length
    );
  };

  const getIndex = (steps) => {
    return (((index + steps) % length) + length) % length;
  };

  return [index, moveIndex, getIndex];
  // return [index, moveIndex, nextIndex, prevIndex, getIndex];
}

export default useIndexCount;
