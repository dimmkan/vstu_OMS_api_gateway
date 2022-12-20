export declare namespace EmployeeSetAvatar {
    const topic = "employee.setavatar.query";
    class Request {
        id: number;
        avatar: string;
        filename: string;
    }
    class Response {
        avatar_id: string;
    }
}
