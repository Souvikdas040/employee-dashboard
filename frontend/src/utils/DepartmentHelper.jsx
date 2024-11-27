import axios from "axios";
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({Id, onDepartmentDelete}) => {

    const navigate = useNavigate()

    const handleDelete = async(id) => {
        const confirm = window.confirm("Are you sure you want to delete?")

        if(confirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    onDepartmentDelete()
                } else {
                    alert("Failed to fetch department data.");
                }
            } catch (error) {
                // Improved error handling
                if (error.response && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    console.error("An unexpected error occurred:", error.message);
                    alert("Failed to fetch department details. Please try again.");
                }
            }
        }
    }

    return(
        <div className="flex space-x-3">
            <button 
                className="px-3 py-1 bg-teal-600 text-white" 
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            ><FaEdit/></button>

            <button
                className="px-3 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(Id)}
            ><MdDelete /></button>
        </div>
    )
}