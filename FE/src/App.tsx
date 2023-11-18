import { useEffect, useState } from "react";
import "./App.css";
import { TfiSearch } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { ITask } from "./common/models/ITask";
import service from "./service";
import { IUser } from "../../BE/src/interface/IUser";
import { FiXOctagon } from "react-icons/fi";
import { Pagination } from "antd";
import { Slide, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [listTask, setListTask] = useState<ITask[]>([]);
    const [listUser, setListUser] = useState<IUser[]>([]);
    const [task, setTask] = useState<ITask>({
        _id: undefined,
        title: "",
        content: "",
        status: false,
        assignee: undefined,
    });
    const [search, setSearch] = useState(" ");
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    //* get all user and task
    const fetchData = async () => {
        await service
            .getAllTask({ page, size: 3 })
            .then(({ tasks, totalItem }: any) => {
                if (task) {
                    setListTask(tasks);
                    setTotalItem(totalItem);
                }
            }).catch(()=>{
                toast.error("get task failed !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                    theme : "colored"
                });
            });
        await service.getAllUser().then((data) => {
            setListUser(data);
        }).catch(()=>{
            toast.error("get user failed !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                theme : "colored"
            });
        });
    };
    useEffect(() => {
        fetchData();
    }, [page]);
    function getUserById(id: String) {
        let user = listUser.find((user) => {
            return user._id == id;
        });
        return user;
    }
    const onchangeValue = (event: any) => {
        let { name, value } = event.target;
        setTask((task) => ({
            ...task,
            [name]: value,
        }));
    };
    const setFormEdit = (task: ITask) => {
        setTask(task);
    };
    const handelSave = async (event: any) => {
        event.preventDefault();
        await service.saveTask(task).then(() => {
            fetchData();
            resetFrom();  
            toast.success("save task success !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                transition: Slide,
                theme : "colored"});
        }).catch((error)=>{
            console.log(error);
            
            toast.error("save task failed !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                transition: Slide,
                theme : "colored"
            });
        });
    };
    const onchangeSearchValue = (event: any) => {
        setSearch(event.target.value);
    };
    // * submit search by title
    const handelSearch = async (event: any) => {
        event.preventDefault();
        console.log(search);
        
        if (search=='') {
            await fetchData();
            setSearch("s ");
        } else {
            await service.findByTitle(search).then((data) => {
                setListTask(data);
                setSearch("a");
            });
        }
    };
    const resetFrom = () => {
        setTask({
            _id: undefined,
            title: "",
            content: "",
            status: false,
            assignee: undefined,
        });
    };
    const setStatusTask =async (id:any)=>{
        await service.setStatusTask(id).then(()=>{
            fetchData();
            toast.success("change status success !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                transition: Slide,
                theme : "colored"
            });
        })
    }
    const deleteTask = async (id:any)=>{
        await service.deleteTask(id).then(()=>{
            fetchData();
            toast.success("delete task success !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                transition: Slide,
                theme : "colored"
            });
        }).catch(()=>{
            toast.error("delete task failed !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                transition: Slide,
                theme : "colored"
            });
        })
    }
    const changePage = (page: number) => {
        setPage(page);
    };
    return (
        <>
            <h1 className="text-danger d-flex justify-content-center">Todo-App</h1>
            <div className="todo">
                <form
                    className=" search d-flex justify-content-center pt-4 pb-3 "
                    onSubmit={handelSearch}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        onChange={onchangeSearchValue}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary ml-2">
                        <TfiSearch />
                    </button>
                </form>
                <form className="save" onSubmit={handelSave}>
                    <input
                        name="title"
                        required={true}
                        value={task.title}
                        onChange={onchangeValue}
                        type="text"
                        placeholder="title"
                    />
                    <input
                        name="content"
                        required={true}
                        onChange={onchangeValue}
                        value={task.content}
                        type="text"
                        placeholder="content"
                    />
                    <select
                        name="assignee"
                        onChange={onchangeValue}
                        value={task.assignee?task.assignee:""}>  
                        <option value={""}></option>           
                        {listUser.map((user) => {
                            return (
                                <option key={user._id} value={user._id}>
                                    {user.userName}
                                </option>
                            );
                        })}
                    </select>
                    <button type="submit" className="btn btn-success ml-2">
                        <FiPlus />
                    </button>
                </form>
                <table className="table table-striped table-dark mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Status</th>
                            <th scope="col">assignee</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTask.map((task, index) => {
                            return (
                                <tr key={task._id}>
                                    <td>{index}</td>
                                    <td>{task.title}</td>
                                    <td>{task.content}</td>
                                    <td
                                        className={
                                            task.status
                                                ? "text-success"
                                                : "text-danger"
                                        }>
                                        {task.status ? "done" : "inprogress"}
                                    </td>
                                    <td>
                                        {task.assignee
                                            ? getUserById(task.assignee)
                                                ?.userName
                                            : ""}
                                    </td>
                                    <td className="d-flex justify-content-center">
                                        <button className=" btn btn-primary"
                                            onClick={() => setFormEdit(task)}>
                                            <FiEdit />
                                        </button>
                                        <button onClick={()=>setStatusTask(task._id)} className={task.status?"btn btn-warning ml-2":"btn btn-success ml-2"} >
                                            {task.status ? (
                                                <FiX />
                                            ) : (
                                                <FiCheck />
                                            )}
                                        </button>
                                        <button className="ml-2 btn btn-danger" onClick={()=>deleteTask(task._id)}><FiXOctagon /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    total={totalItem}
                    showTotal={(total) => `Total ${total} items`}
                    defaultPageSize={2}
                    defaultCurrent={1}
                    onChange={changePage}
                />
                <ToastContainer />
            </div>
        </>
    );
}

export default App;
