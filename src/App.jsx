/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  // using useCallback so it does not get recreated when count updates and does not cause HeavyDataItem to rerender itself
  const handleClick = useCallback(() => setCount((count) => count + 1), []);

  // using useMemo so heavyData does not get recomputed when count updates and does not cause HeavyDataItem to rerender itself because of mapping heavyData
  const heavyData = useMemo(() => {
    return data?.map((item) => ({ ...item }));
  }, [data]);

  return (
    <>
      <button>count is {count}</button>

      {!!heavyData?.length &&
        heavyData.map((item) => (
          <HeavyDataItem key={item.id} item={item} onClick={handleClick} />
        ))}
    </>
  );
}

export default App;

const HeavyDataItem = React.memo(({ item = {}, onClick = () => {} }) => {
  console.log("Rendering => HeavyDataItem");
  return (
    <div className="HeavyDataItem" key={item.id} onClick={onClick}>
      {item.title} <button>Increment Count</button>
    </div>
  );
});
