import IResponse from "../interface/IResponse";
let response :IResponse;
const ApiResponse = (result: any,message: string)=>{
    return {...response, result, message, error: false};
} 
export default  ApiResponse;