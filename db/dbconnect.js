import mongoose from "mongoose";


export default function dbconnect() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("Error in the DB Connection");
    }
}

