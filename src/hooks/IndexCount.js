import { useState, useMemo } from "react";

function useIndexCount(arr_length) {
  const [index, setIndex] = useState(0);
  const length = useMemo(() => arr_length, [arr_length]);

  const moveIndex = (direction) => {
    if (direction === 0) {
      setIndex(0);
      return;
    }

    if (index + direction >= length) {
      setIndex(0);
    } else if (index + direction < 0) {
      setIndex(length - 1);
    } else {
      setIndex(index + direction);
    }
  };

  return [index, moveIndex];
}

export default useIndexCount;
