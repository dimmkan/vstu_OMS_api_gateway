export declare namespace EmployeeUpdateInfo {
    const topic = "employee.updateinfo.query";
    class Request {
        id: number;
        user_profile: {
            full_name: string;
            sex: string;
            birthday: string;
            specify: string;
        };
    }
    class Response {
        success: boolean;
    }
}
