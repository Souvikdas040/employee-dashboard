import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    setEmployee(response.data.employee);
                } else {
                    alert("Failed to fetch employee data.");
                }
            } catch (error) {
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    console.error("An unexpected error occurred:", error.message);
                    alert("Failed to fetch employee details. Please try again.");
                }
            }
        };
        fetchEmployee();
    }, [id]);

    return (
        <>
            {employee ? (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                        Employee Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={`http://localhost:5000/${employee.userId?.profileImage}`}
                                className="rounded-full border w-72"
                                alt={`${employee.userId?.name || "Employee"}'s Profile`}
                            />
                        </div>
                        <div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Name:</p>
                                <p className="font-medium">{employee.userId?.name || "N/A"}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Employee ID:</p>
                                <p className="font-medium">{employee.employeeId || "N/A"}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Date of Birth:</p>
                                <p className="font-medium">
                                    {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Gender:</p>
                                <p className="font-medium">{employee.gender || "N/A"}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Department:</p>
                                <p className="font-medium">{employee.department?.dep_name || "N/A"}</p>
                            </div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Marital Status:</p>
                                <p className="font-medium">{employee.maritalStatus || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default View;
