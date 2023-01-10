export declare namespace GetUserOrders {
    const topic = "order.getbyuser.query";
    class Request {
        user_id: number;
    }
    class Response {
        data: {
            id: number;
            date_created: number | null;
            date_updated: number | null;
            user_id: number;
            employee_id: number | null;
            theme: string;
            description: string;
            status: string;
        }[];
    }
}
