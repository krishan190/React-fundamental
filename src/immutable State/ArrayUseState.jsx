//   React state must be treated as immutable
// Here you changed the same object in memory.
// React checks state change using reference comparison:

import { useState } from "react";

const initState = ["krishan", "Namdev"];

export const ArrayUseState = () => {
  const [person, setPerson] = useState(initState);

  const changeName = () => {
    // person.push("Abhishek");
    // person.push("Dubey");
    setPerson(["Abhishek", "Dubey"]); //first way
    setPerson((prev) => {
      const newArr = [...prev];
      newArr[0] = "Harsh";
      newArr[1] = "kesharwani";
      return newArr;
    }); //second way
    setPerson((prev) => ["Harsh", "kesharwani"]); //third way
  };

  console.log("ArrayUseState Render");

  return (
    <div>
      <button onClick={changeName}>Click</button>
      {person.map((person) => (
        <div key={person}>{person}</div>
      ))}
    </div>
  );
};
