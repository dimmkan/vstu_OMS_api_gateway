export declare namespace ValidateEmployeeEmail {
    const topic = "employee.validateemail.command";
    class Request {
        email: string;
    }
    class Response {
        validate: boolean;
    }
}
