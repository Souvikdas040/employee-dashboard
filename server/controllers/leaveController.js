// import Employee from '../models/Employee.js';
// import Leave from '../models/Leave.js';

// const addLeave = async (req, res) => {
//     try {
//         const {
//             userId,
//             leaveType,
//             startDate,
//             endDate,
//             reason
//         } = req.body;

//         // Check if employee exists
//         const employee = await Employee.findOne({ userId });

//         // Create a new leave request
//         const newLeave = new Leave({
//             employeeId: employee._id,
//             leaveType,
//             startDate,
//             endDate,
//             reason
//         });

//         // Save the leave request
//         await newLeave.save();
//         return res.status(200).json({ success: true });
//     } catch (error) {
//         console.error(error); // Log error details for debugging
//         return res.status(500).json({ success: false, error: "Failed to apply leave" });
//     }
// };

// const getLeave = async (req, res) => {
//     try{
//         const {id, role} = req.params;
//         if (!id) {
//             return res.status(400).json({ success: false, error: "Employee ID is required" });
//         }
//         if (!role) {
//             return res.status(400).json({ success: false, error: "Role is required" });
//         }
        
//         let leaves
//         if(role === 'admin') {
//             leaves = await Leave.find({employeeId: id});
//         }

//         else {
//             const employee = await Employee.findOne({userId: id})
//             leaves = await Leave.find({employeeId: employee._id})
//         }

//         return res.status(200).json({ success: true, leaves });
//     }

//     catch (error) {
//         console.error(error); // Log error details for debugging
//         return res.status(500).json({ success: false, error: "Failed to get leaves" });
//     }
// }

// const getLeaves = async (req, res) => {
//     try {
//         // const {id} = req.params;
//         // const employee = await Employee.findOne({userId: id});

//         const leaves = await Leave.find({employeeId: employee._id})
//         return res.status(200).json({ success: true, leaves });
//     }

//     catch (error) {
//         console.error(error); // Log error details for debugging
//         return res.status(500).json({ success: false, error: "Failed to apply leave" });
//     }
// }

// export { addLeave, getLeaves,  getLeave};


import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';

const addLeave = async (req, res) => {
    try {
        const {
            userId,
            leaveType,
            startDate,
            endDate,
            reason
        } = req.body;

        // Check if employee exists
        const employee = await Employee.findOne({ userId });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Create a new leave request
        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        // Save the leave request
        await newLeave.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error); // Log error details for debugging
        return res.status(500).json({ success: false, error: "Failed to apply leave" });
    }
};

const getLeave = async (req, res) => {
    try {
        const {id, role} = req.params;
        let leaves
        if(role === "admin") {
            leaves = await Leave.find({employeeId: id})
        }
        if(!leaves || leaves.length === 0) {
            const employee = await Employee.findOne({userId: id})
            leaves = await Leave.find({employeeId: employee._id})
        }
        return res.status(200).json({ success: true, leaves });
    } catch(error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Failed to get leave"})
    }
}


export { addLeave, getLeave };
