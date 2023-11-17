import mongoose from "mongoose";
import { IUser } from "../interface/IUser";

const UserSchema = new mongoose.Schema({
    userName : {type:String},
})

const UserModel = mongoose.model<IUser>('users',UserSchema);
export default UserModel;