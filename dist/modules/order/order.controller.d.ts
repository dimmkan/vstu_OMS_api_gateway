import { RMQService } from 'nestjs-rmq';
import { ChangeOrderStatus, CreateOrder, ChangeOrderDescription, DeleteOrder } from 'src/contracts';
import { ICreateOrderDto } from 'src/contracts/order/dto/createOrder.dto';
export declare class OrderController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    createOrder(dto: ICreateOrderDto, { id }: {
        id: any;
    }): Promise<CreateOrder.Response>;
    changeOrderStatus(dto: ChangeOrderStatus.Request): Promise<ChangeOrderStatus.Response>;
    changeOrderDescription(dto: ChangeOrderDescription.Request): Promise<ChangeOrderDescription.Response>;
    deleteOrder(dto: DeleteOrder.Request): Promise<DeleteOrder.Response>;
}
