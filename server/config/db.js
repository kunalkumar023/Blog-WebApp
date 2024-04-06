import mongoose from "mongoose";

const connectToMongo = async()=>{
    const res = await mongoose.connect(
        "mongodb://127.0.0.1:27017/blog_App"
    ).then(console.log("Database is connected")).catch("Error in connection in database");
};

export default connectToMongo;