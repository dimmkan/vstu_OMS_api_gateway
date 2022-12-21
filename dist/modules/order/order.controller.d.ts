import { RMQService } from 'nestjs-rmq';
import { ChangeOrderStatus, CreateOrder } from 'src/contracts';
import { ICreateOrderDto } from 'src/contracts/order/dto/createOrder.dto';
export declare class OrderController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    createOrder(dto: ICreateOrderDto, { id }: {
        id: any;
    }): Promise<CreateOrder.Response>;
    changeOrderStatus(dto: ChangeOrderStatus.Request): Promise<ChangeOrderStatus.Response>;
}
