import mongoose from "mongoose";


export default function dbconnect() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("Error in the DB Connection");
    }
}

