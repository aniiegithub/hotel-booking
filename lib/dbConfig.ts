import mongoose from "mongoose";

const mongo_db_uri= process.env.MONGODB_URI;

if(!mongo_db_uri){
    throw new Error("Please define the mongodb uri")
}

export default async function dbConfig(){
    if(mongoose.connection.readyState >=1){
        return;
    }
    try{
      await mongoose.connect(mongo_db_uri || "");
      console.log("MongoDB connected sucessfully !!")
    }
    catch(error){
        console.log(error)
        throw new Error("Failed to connect!")
    }
}