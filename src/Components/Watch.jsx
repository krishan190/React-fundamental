import React, { useState, useEffect } from "react";

export default function Watch() {
    // state to store time
    const [time, setTime] = useState(0);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Hours calculation
    const hours = Math.floor(time / 360000);
    console.log("hours", hours)

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);
    console.log("minutes", minutes)

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);
    console.log("seconds", seconds)

    // Milliseconds calculation
    const milliseconds = time % 100;
    console.log("milliseconds", milliseconds)

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };
    return (
        <div >
            <p>
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
            </p>
            <div>
                <button onClick={startAndStop}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};