import { useRef, useState, useEffect } from "react";

export default function StopWatch() {
    const [time, setTime] = useState(0); // seconds
    const intervalRef = useRef(null);
    const startRef = useRef(null);

    console.log("render hua");
    
    function handleStart() {
        if (intervalRef.current) return; // prevent multiple intervals

        startRef.current = Date.now() - time * 1000;
        console.log("ref current", startRef.current);

        intervalRef.current = setInterval(() => {
            setTime((Date.now() - startRef.current) / 1000);
        }, 50);
    }

    function handleStop() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    function handleClear() {
        handleStop();
        setTime(0);
    }

    // cleanup on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <h1>Time Passed: {time.toFixed(3)}</h1>

            <button onClick={handleStart}>START</button>
            <button onClick={handleStop}>STOP</button>
            <button onClick={handleClear}>CLEAR</button>
        </>
    );
}
