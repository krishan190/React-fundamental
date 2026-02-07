"use client";
import { useFormState } from "react-dom";

async function createPost(prevState, formData) {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            body: JSON.stringify({
                title: formData.get("title"),
                body: formData.get("body"),
                userId: 1
            }),
            headers: { "Content-type": "application/json" }
        }
    );

    if (!res.ok) return { error: "Failed to submit" };
    return { success: "Post created successfully!" };
}

export default function Form() {
    const [state, action] = useFormState(createPost, {});
    // console.log("action", action);

    return (
        <form action={action}>
            <input name="title" placeholder="Title" />
            <textarea name="body" placeholder="Body" />
            <button type="submit">Submit</button>

            {state?.error && <p>{state.error}</p>}
            {state?.success && <p>{state.success}</p>}
        </form>
    );
}

// useFormStatus: "pending" | "success" | "error"

import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}

