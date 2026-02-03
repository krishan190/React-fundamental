import axios from "axios";
import { useEffect, useState } from "react";
import "../custom css/Pagination.css";

function Pagination() {
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/users?limit=0")
            .then((res) => setTableData(res.data.users))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="pagination-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;
