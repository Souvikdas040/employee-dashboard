import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

import User from './models/User.js';  // Use import instead of require
import bcrypt from 'bcrypt';  // Use import instead of require
import connectToDatabase from './db/db.js';  // Use import instead of require

const userRegister = async () => {
    connectToDatabase();  // Ensure this connects correctly
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        });
        await newUser.save();
        console.log("Admin user created successfully!");
    } catch (error) {
        console.log(error);
    }
};

userRegister();
