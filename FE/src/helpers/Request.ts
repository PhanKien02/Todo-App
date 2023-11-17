import axios from "axios";

class HttpRequest {
    private baseURL = "http://localhost:5000/api";
    
    public instance = axios.create({
        baseURL: this.baseURL  ,
        timeout: 1000000,
        headers: { "X-Custom-Header": "foobar" },
        withCredentials: true,
    });
}
const httpRequest = new HttpRequest;
export default httpRequest.instance;