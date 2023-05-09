import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
   
    if (isConnected) {
        console.log("=> using existing database connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("=> using new database connection");
        isConnected = true;   
    
    } catch (error) {
        console.log("=> error connecting to database", error);    
    }   
};