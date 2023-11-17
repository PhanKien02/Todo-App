export interface ITask{
    _id : string |undefined ;
    title: string,
    content : string,
    status : boolean,
    assignee : string | undefined,
}