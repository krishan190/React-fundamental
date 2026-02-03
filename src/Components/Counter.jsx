import { useRef } from "react";

export default function Counter() {
    let ref = useRef(0);

    
    function handleClick() {
        ref.current = ref.current + 1;
        alert('You clicked ' + ref.current + ' times!');
    }

    return (
        <>
            {/* <h1>Count : {ref.current}</h1> */}
            <button onClick={handleClick}>
                Click me!
            </button>
        </>
    );
}