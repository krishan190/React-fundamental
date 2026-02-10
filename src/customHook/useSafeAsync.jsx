import { useState } from "react";

export function useSafeAsync() {
    const running = useRef(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const timeout = 10000;

    const execute = async () => {
        if (running.current) return;

        const controller = new AbortController();
        const timer = setTimeout(() => {
            controller.abort()
        }, timeout);

        running.current = true;
        setLoading(true);
        setError(true);
        setSuccess(false);


        try {
            const res = await fn(controller.signal, ...args);
            setSuccess(true);
            return res;
        } catch (error) {
            if (error.name === "AbortError") {
                setError(new Error("Request timed out"));
            } else {
                setError(err);
            }
            throw err;
        } finally {
            clearTimeout(timer);
            running.current = false;
            setLoading(false);
        }
    }
}


function createOrder() {
    
    const createOrder = async () => {
        const res = await fetch('/api/order', {
            method: "POST",
            signal,//=>This is enables timeout cancel
        });

        if (!res.ok) throw new Error("order failed");

        return res.json();
    };
    const { execute, loading, error, success } = useSafeAsync(createOrder, 8000);

    return (
        <div>
            <button onClick={execute} disabled={loading}>
                {loading ? "Processing" : "Place Order"}
            </button>

            {success && <p>Order Placed</p>}
            {error && <p>{String(error)}</p>}
        </div>
    )
}