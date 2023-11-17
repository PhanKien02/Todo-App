import { IUser } from "../interface/IUser";
import UserModel from "../models/UserModel";

class UserService {
    private userMode = UserModel;

    public async getAllUser (){
        return await this.userMode.find();
    }
    public async saveUser (user:IUser){
        const check = await this.userMode.findOne({ _id: user._id });
        if (check) await this.userMode.updateOne({ _id: user._id }, user);
        else {
            const res = await this.userMode.create(user);
            return res;
        }
    }
}

const userService = new UserService;
export default userService;