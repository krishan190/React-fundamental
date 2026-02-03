import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef(0);
    console.log("ref current", ref);

    useEffect(() => {
        ref.current = value;
    }, [value])

    return ref.current;
}


export default function usePreviousCount() {

    const [count, setCount] = useState(0);

    const previousCount = usePrevious(count);
    console.log("previousCount",previousCount);
    

    return (
        <div>
            <h2>Use Previous Demo</h2>
            <p>Current Count: {count}</p>
            <p>Previous Count: {previousCount ?? "-"}</p>

            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        </div >
    )
}