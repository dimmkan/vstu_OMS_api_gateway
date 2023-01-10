export declare namespace CreateOrder {
    const topic = "order.create.command";
    class Request {
        user_id: number;
        theme: string;
        description: string;
    }
    class Response {
        success: boolean;
    }
}
