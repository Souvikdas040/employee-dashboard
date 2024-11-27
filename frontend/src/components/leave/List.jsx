import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const List = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    let sno = 1;
    const {id} = useParams()

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setLeaves(response.data.leaves);
            } else {
                alert("Failed to fetch leave records.");
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
            alert(error.message || "An error occurred while fetching leaves.");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by department name"
                    className="px-4 py-0.5 border"
                />
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add new leave
                </Link>
            </div>

            <table className="w-full text-sm text-left text-gray-500 mt-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3">S No</th>
                        <th className="px-6 py-3">Employee Name</th>
                        <th className="px-6 py-3">Leave Type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave, index) => (
                            <tr
                                key={leave._id || index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">
                                    {leave.employeeId?.name || "N/A"}
                                </td>
                                <td className="px-6 py-3">{leave.leaveType}</td>
                                <td className="px-6 py-3">
                                    {new Date(leave.startDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3">
                                    {new Date(leave.endDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3">{leave.reason}</td>
                                <td className="px-6 py-3">{leave.status || "Pending"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-6 py-3 text-center" colSpan="7">
                                No leave records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default List;
