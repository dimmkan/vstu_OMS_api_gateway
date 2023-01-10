export declare namespace ChangeOrderDescription {
    const topic = "order.changedescription.command";
    class Request {
        order_id: string;
        description: string;
    }
    class Response {
        success: boolean;
    }
}
