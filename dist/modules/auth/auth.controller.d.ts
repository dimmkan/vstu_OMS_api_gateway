import { RMQService } from 'nestjs-rmq';
import { ILoginUser } from 'src/interfaces/loginUser.interface';
import { AuthLogin } from '../../contracts';
import { AuthRegister } from '../../contracts';
import { AuthConfirm } from '../../contracts';
export declare class AuthController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    register(dto: AuthRegister.Request): Promise<AuthRegister.Response>;
    confirm(code: string): Promise<AuthConfirm.Response>;
    login(dto: ILoginUser, req: any): Promise<AuthLogin.Response>;
}
