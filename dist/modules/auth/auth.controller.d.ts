import { RMQService } from 'nestjs-rmq';
import { ILoginUser } from 'src/interfaces/loginUser.interface';
import { IRefreshToken } from 'src/interfaces/refreshToken.interface';
import { AuthRegister, AuthRegisterEmployee, AuthLogin, AuthLogout, AuthRefresh, AuthConfirm, AuthConfirmEmployee, AuthLoginEmployee, AuthRefreshEmployee, AuthLogoutEmployee } from '../../contracts';
export declare class AuthController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    register(dto: AuthRegister.Request): Promise<AuthRegister.Response>;
    confirm(code: string): Promise<AuthConfirm.Response>;
    login(dto: ILoginUser, req: any): Promise<AuthLogin.Response>;
    refresh(dto: IRefreshToken, req: any): Promise<AuthRefresh.Response>;
    logout(dto: AuthLogout.Request): Promise<AuthLogout.Response>;
    registerEmployee(dto: AuthRegisterEmployee.Request): Promise<AuthRegisterEmployee.Response>;
    confirmEmployee(code: string): Promise<AuthConfirmEmployee.Response>;
    loginEmployee(dto: ILoginUser, req: any): Promise<AuthLoginEmployee.Response>;
    refreshEmployee(dto: IRefreshToken, req: any): Promise<AuthRefreshEmployee.Response>;
    logoutEmployee(dto: AuthLogoutEmployee.Request): Promise<AuthLogoutEmployee.Response>;
}
