function ControlledCmp() {
    const [name, setName] = useState("");
    return (
        <div>
            <h1>ControlledCmp</h1>
            <form action="" method="get">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                />
                <br />
                <button type="submit">Submit</button>
                <h1>{name}</h1>
            </form>
        </div>
    );
}

export default ControlledCmp;