export declare namespace EmployeeGetInfo {
    const topic = "employee.getinfo.query";
    class Request {
        id: number;
    }
    class Response {
        id: number;
        email: string;
        confirmed: boolean;
        employee_profile: {
            id: number;
            full_name: string;
            sex: string;
            birthday: string;
            specify: string;
        };
    }
}
