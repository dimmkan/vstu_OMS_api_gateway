import { RMQService } from 'nestjs-rmq';
export declare class UserController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    info({ id }: {
        id: any;
    }): any;
}
