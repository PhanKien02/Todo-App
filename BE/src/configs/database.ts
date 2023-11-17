import mongoose from "mongoose";
import dotenv from  "dotenv"
dotenv.config(); 
class ConnectDB {
    private url = process.env.DB_URL || "";
    public connectDB =async ()=>{
        await mongoose.connect(this.url).then(()=>{
            console.log("Connect mongoose succesfully!");
        });
    }
}
const connectDB = new ConnectDB;
export default connectDB.connectDB;