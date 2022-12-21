declare const statuses: readonly ["accepted", "inprogress", "finished"];
export declare type Statuses = typeof statuses[number];
export declare namespace ChangeOrderStatus {
    const topic = "order.changestatus.command";
    class Request {
        order_id: number;
        status: Statuses;
    }
    class Response {
        success: boolean;
    }
}
export {};
