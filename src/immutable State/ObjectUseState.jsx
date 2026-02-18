//   React state must be treated as immutable
// Here you changed the same object in memory.
// React checks state change using reference comparison:

import { useState } from "react";

const initState = {
  fname: "krishan",
  lname: "Namdev",
};

export const ObjectUseState = () => {
  const [person, setPerson] = useState(initState);

  const changeName = () => {
    // person.fname = "Harsh";
    // person.lname = "kesharwani";
    setPerson({ ...person, fname: "Harsh", lname: "kesharwani" });
  };

  console.log("ObjectState Render");

  return (
    <div>
      <button onClick={changeName}>
        {person.fname} {person.lname}
      </button>
    </div>
  );
};

// In my code I was mutating the state object directly.
// React state should be treated as immutable.
// Since React compares object references, mutating the same object may not trigger re-render.
// The correct way is to create a new object using spread operator or functional update.
