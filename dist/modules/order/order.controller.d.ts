import { RMQService } from 'nestjs-rmq';
import { CreateOrder } from 'src/contracts/order/createOrder';
import { ICreateOrderDto } from 'src/contracts/order/dto/createOrder.dto';
export declare class OrderController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    createOrder(dto: ICreateOrderDto, { id }: {
        id: any;
    }): Promise<CreateOrder.Response>;
}
