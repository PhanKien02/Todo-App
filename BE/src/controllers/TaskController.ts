import { NextFunction, Request ,Response} from 'express';
import taskService from '../services/TaskService';
import ApiResponse from '../utils/ApiResponse';
import { ITask } from '../interface/ITask';
import 'express-async-errors';
class TaskController {
    public async getAll (req:Request, res : Response){
        const {page,size} = req.query;
        const parePage = parseInt(page as string,10) 
        const paresize = parseInt(size as string,10) 
        const response = await taskService.getAllTask(parePage,paresize);
        return res.status(200).json(ApiResponse(response,"get all task success"));
    }
    public async save (req:Request, res : Response, next: NextFunction){
        try {
            const user = req.body as ITask;
            const response = taskService.saveTask(user);
            return res.status(200).json(ApiResponse(response,"save task success"));
        } catch (error) {
            console.log("error");
            
            next(error);
        }
    }
    public async setStatus  (req:Request, res : Response){
        const id = req.query.id as String;
        const response = await taskService.setStatusTask(id);
        return res.status(200).json(ApiResponse(response,"set status task success"));
    }
    public async findbyTitle  (req:Request, res : Response){
        const title = req.body.title;        
        const response = await taskService.findByTitle(title);
        return res.status(200).json(ApiResponse(response,"set status task success"));
    }
    public async deleteTask (req:Request, res : Response){
        const id = req.query.id as String;        
        const response = await taskService.deleteTask(id);
        return res.status(200).json(ApiResponse(response,"delete task success"));
    }
}
const taskController = new TaskController;
export default taskController;