export declare namespace DeleteOrder {
    const topic = "order.delete.command";
    class Request {
        order_id: string;
    }
    class Response {
        success: boolean;
    }
}
