"use client";
import { useActionState } from "react";

async function fetchPosts(prevState) {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data.slice(0, 5);
}

export default function ActionState() {
    const [posts, action, pending] = useActionState(fetchPosts, []);

    return (
        <>
            <button onClick={action}>
                {pending ? "Loading..." : "Load Posts"}
            </button>

            <ul>
                {posts.map(p => (
                    <>
                   <li key={p.id}>{p.title}</li>
                   <li key={p.id}>{p.body}</li>
                    </>
                ))}
            </ul>
        </>
    );
}
