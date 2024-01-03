import mongoose from "mongoose";

const DBconfig=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected");
    } catch (error) {
        console.log("couldn't connect DB",error);
    }
}

export default DBconfig;



