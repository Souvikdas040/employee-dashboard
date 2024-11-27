import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                if (response.data.success) {
                    const data = response.data.employees.map((emp, index) => ({
                        _id: emp._id,
                        sno: index + 1,  // Use index as serial number
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: (
                            <img
                                className="w-10 h-10 rounded-full"
                                src={`http://localhost:5000/${emp.userId.profileImage}`}
                                alt={`${emp.userId.name}'s profile`}
                            />
                        ),
                        action: <EmployeeButtons Id={emp._id} />,
                    }));
                    setEmployees(data);
                }
            } catch (error) {
                const errorMessage =
                    error.response && error.response.data.error
                        ? error.response.data.error
                        : "An error occurred while fetching employees.";
                console.error(errorMessage);  // Log the error for debugging
                alert(errorMessage);
            } finally {
                setEmpLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredEmployees = employees.filter((emp) =>
        emp.dep_name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by department name"
                    className="px-4 py-0.5 border"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add new employee
                </Link>
            </div>

            {empLoading ? (
                <div className="text-center">Loading...</div> // Show loading text while fetching data
            ) : (
                <div>
                    <DataTable
                        className="z-40"
                        columns={columns}
                        data={filteredEmployees}
                        pagination // Use filtered data for search
                    />
                </div>
            )}
        </div>
    );
};

export default List;
