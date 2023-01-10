export declare namespace GetUserOrders {
    const topic = "order.getbyuser.query";
    class Request {
        user_id: number;
    }
    class Response {
        data: [];
    }
}
