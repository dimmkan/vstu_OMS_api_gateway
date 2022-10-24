import { RMQService } from 'nestjs-rmq';
import { ILoginUser } from 'src/interfaces/loginUser.interface';
import { IRefreshToken } from 'src/interfaces/refreshToken.interface';
import { AuthLogin, AuthLogout, AuthRefresh } from '../../contracts';
import { AuthRegister } from '../../contracts';
import { AuthConfirm } from '../../contracts';
export declare class AuthController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    register(dto: AuthRegister.Request): Promise<AuthRegister.Response>;
    confirm(code: string): Promise<AuthConfirm.Response>;
    login(dto: ILoginUser, req: any): Promise<AuthLogin.Response>;
    refresh(dto: IRefreshToken, req: any): Promise<AuthRefresh.Response>;
    logout(dto: AuthLogout.Request): Promise<AuthLogout.Response>;
}
