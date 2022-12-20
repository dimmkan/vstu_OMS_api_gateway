export declare namespace GenerateRefreshPasswordLinkEmployee {
    const topic = "employee.generaterefreshpasswordlink.command";
    class Request {
        email: string;
        new_password: string;
    }
    class Response {
        success: boolean;
    }
}
