import { Request ,Response} from 'express';
import userService from '../services/UserService';
import ApiResponse from '../utils/ApiResponse';
import { IUser } from '../interface/IUser';
class UserController {
    public async getAll (req: Request, res: Response){
        const response = await userService.getAllUser();
        return res.status(200).json(ApiResponse(response,"get all user"));
    }
    public async save (req:Request, res : Response){
        console.log("body",req.body);
        const user = req.body as IUser;
        const response = userService.saveUser(user);
        return res.status(200).json(ApiResponse(response,"save user success"));
    }
}
const userController = new UserController;
export default userController;