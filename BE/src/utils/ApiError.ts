export  class ApiError extends Error {
    statusCode: number;
    error : boolean
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.error = true;
    }
}