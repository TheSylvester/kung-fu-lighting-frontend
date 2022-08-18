import { useState, useMemo } from "react";

function useIndexCount(arr_length = 0) {
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

  const nextIndex = () => (index + 1 >= length ? 0 : index + 1);
  const prevIndex = () => (index - 1 < 0 ? length - 1 : index - 1);

  return [index, moveIndex, nextIndex, prevIndex];
}

export default useIndexCount;
