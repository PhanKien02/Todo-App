import { ITask } from "../interface/ITask";
import TaskModel from "../models/TaskModel";
import { ApiError } from "../utils/ApiError";

class TaskService {
    private taskMode = TaskModel;
    public getAllTask = async (page: number, size: number) => {
        try {
            const totalItem = await this.taskMode.countDocuments();
            const tasks = await this.taskMode
                .find()
                .skip((page - 1) * size)
                .limit(size);
            return { tasks, totalItem };
        } catch (error) {
            throw new ApiError(400,"get all task failed");
        }
    };
    public saveTask = async (task: ITask) => {
        task.assignee as String;
        try {
            if (task._id) {
                {
                    task._id as String;
                    await this.taskMode.updateOne({ _id: task._id }, task);
                }
            } else {
                const res = await this.taskMode.create(task);
                return res;
            }
        } catch (error) {   
            throw new ApiError(400,"save task failed");
        }
    };
    public setStatusTask = async (idTask: String) => {
        const check = await this.taskMode.findById(idTask);
        if (!check) throw new ApiError(400, "task not found");
        if (check?.status)
            return await this.taskMode.updateOne(
                { _id: idTask },
                { $set: { status: false } }
            );
        else
            return await this.taskMode.updateOne(
                { _id: idTask },
                { $set: { status: true } }
            );
    };
    public findByTitle = async (title: String) => {
        const task = await this.taskMode.find({ title: { $regex: title } });
        return task;
    };
    public deleteTask = async (id: String) => {
        const check = await this.taskMode.findById(id);
        if(check)
            return await this.taskMode.deleteOne({_id:id});
        else throw new ApiError(400, "task not found"); 
    };
}
const taskService = new TaskService();
export default taskService;
