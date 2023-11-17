import mongoose from "mongoose";
import { ITask } from "../interface/ITask";

const TaskSchema = new mongoose.Schema<ITask>({
    title :  {type:String},
    content : {type:String},
    status :{type:Boolean,default:false},
    assignee: {type: mongoose.Schema.ObjectId,ref:"users"}
})

const TaskModel = mongoose.model<ITask>('tasks',TaskSchema);
export default TaskModel;