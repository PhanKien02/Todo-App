import { Router } from "express";
import taskController from "../controllers/taskController";
import userController from "../controllers/UserController";

const router = Router();

function ApiRouter (app:any){
        router.get("/task/get-all",taskController.getAll);
        router.post("/task/save",taskController.save);
        router.get("/task/status",taskController.setStatus);
        router.post("/task/findByTitle",taskController.findbyTitle);
        router.delete("/task/delete",taskController.deleteTask);
        router.get("/user/get-all",userController.getAll);
        router.post("/user/save",userController.save);
        return app.use("/api",router);
}
export default ApiRouter;
