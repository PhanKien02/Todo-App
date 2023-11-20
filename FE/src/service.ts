import { IResponse } from "./common/models/IResponse";
import { ITask } from "./common/models/ITask";
import Request from "./helpers/Request";

class Service {
    public getAllTask = async ({ page, size }: any) => {
        try {
            const res = await Request.get<IResponse>("task/get-all/", {
                params: {
                    page: page,
                    size: size,
                },
            });
            return res.data.result;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    public async saveTask(task: ITask) {
        try {
            const res = await Request.post<IResponse>("/task/save", task);
            return res.data
        } catch (error) {
            return await Promise.reject(error);
        }
    }
    public async getAllUser() {
        try {
            const res = await Request.get<IResponse>("/user/get-all");
            return res.data.result;
        } catch (error) {
            console.log(error);
        }
    }
    public async findByTitle(title: String) {
        try {
            const res = await Request.post<IResponse>("/task/findByTitle", {
                title: title,
            });
            return res.data.result;
        } catch (error) {}
    }
    public async setStatusTask(_id: string) {
        try {
            await Request.get("/task/status", {
                params: {
                    id: _id,
                },
            });
        } catch (error) {
            return await Promise.reject(error);
        }
    }
    public async deleteTask (_id:string){
        try {
            await Request.delete("/task/delete",{
                params:{
                    id:_id
                }
            })
        } catch (error) {
            return await Promise.reject(error)
        }
    }
}
const service = new Service();
export default service;
