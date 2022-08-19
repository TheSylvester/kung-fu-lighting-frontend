export const Checkbox = ({ id, type, className, boxes, setBoxes }) => {
  const handleCheck = () => {
    setBoxes((b) => {
      if (b.includes(id)) {
        return b.filter((v) => v !== id);
      } else {
        return [...b, id];
      }
    });
  };
  return (
    <>
      <input
        type={type}
        id={id}
        className={className}
        onChange={handleCheck}
        checked={boxes.includes(id)}
      />
    </>
  );
};