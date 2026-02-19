import { useEffect, useState } from "react";

function ShowMoreData() {
    const [users, setUsers] = useState([]);
    const [skip, setSkip] = useState(0);

    const LIMIT = 5;

    const fetchUsers = async () => {
        const res = await fetch(
            `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`
        );
        const data = await res.json();
        console.log("data", data);

        console.log("All Users:", [...users, ...data.users]);
        setUsers(prev => [...prev, ...data.users]);
    };

    useEffect(() => {
        fetchUsers();
    }, [skip]);


    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    {user.firstName} {user.lastName}
                </div>
            ))}

            <button onClick={() => setSkip(prev => prev + LIMIT)}>
                Show More
            </button>
        </div>
    );
}

export default ShowMoreData;
