import { useState } from "react";

function CheckBox() {
    const [skills, setSkills] = useState([]);

    const handleSkills = (event) => {
        if (event.target.checked) {
            setSkills([...skills, event.target.value])
        } else {
            setSkills([...skills.filter((item) => item != event.target.value)]);
        }
    }

    return (
        <div>
            <h3>Select Your skills</h3>
            <input onChange={handleSkills} type="checkbox" id="php" value="php" />
            <label htmlFor="php">PHP</label>

            <input onChange={handleSkills} type="checkbox" id="javascript" value="javascript" />
            <label htmlFor="javascript">JavaScript</label>

            <input onChange={handleSkills} type="checkbox" id="java" value="java" />
            <label htmlFor="java">Java</label>

            <input onChange={handleSkills} type="checkbox" id="react" value="react" />
            <label htmlFor="react">React</label>

            <h1>{skills.toString()}</h1>
        </div>
    )
}

export default CheckBox;