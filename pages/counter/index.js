import React, { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>Count {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Add</button>
      {counter == 0 ? (
        <button disabled>Remove</button>
      ) : (
        <button onClick={() => setCounter(counter - 1)}>Remove</button>
      )}
    </div>
  );
}
