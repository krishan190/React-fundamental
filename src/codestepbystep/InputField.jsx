import { useState } from "react";

function InputField() {
    const [value, setValue] = useState("");
    return (
        <div>
            <h1>InputField</h1>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Name" />
            <h1>{value}</h1>
            <button onClick={() => setValue("")}>Clear value</button>
        </div>
    );
}

export default InputField;