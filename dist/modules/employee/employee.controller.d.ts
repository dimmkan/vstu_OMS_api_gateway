/// <reference types="multer" />
import { RMQService } from 'nestjs-rmq';
import { EmployeeGetAvatar, EmployeeGetInfo, EmployeeUpdateInfo, EmployeeSetAvatar, EmployeeDeleteAvatar, ValidateEmployeeEmail, GenerateRefreshPasswordLinkEmployee, ConfirmRefreshPasswordLinkEmployee } from 'src/contracts';
import { IGenerateRefreshPasswordLinkEmployeeDto } from 'src/contracts/employee/dto/generateRefreshPasswordLinkEmployee.dto';
import { IUpdateEmployeeDto } from 'src/contracts/employee/dto/updateEmployee.dto';
import { IValidateEmployeeEmailDto } from 'src/contracts/employee/dto/validateEmployeeEmail.dto';
export declare class EmployeeController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    getEmployeeInfo({ id }: {
        id: any;
    }): Promise<EmployeeGetInfo.Response>;
    updatEmployeeInfo({ id }: {
        id: any;
    }, dto: IUpdateEmployeeDto): Promise<EmployeeUpdateInfo.Response>;
    getEmployeeAvatar({ id }: {
        id: any;
    }): Promise<EmployeeGetAvatar.Response>;
    setEmployeeAvatar({ id }: {
        id: any;
    }, avatar: Express.Multer.File): Promise<EmployeeSetAvatar.Response>;
    deleteEmployeeAvatar({ id }: {
        id: any;
    }): Promise<EmployeeDeleteAvatar.Response>;
    validateEmployeeEmail(dto: IValidateEmployeeEmailDto): Promise<ValidateEmployeeEmail.Response>;
    generateRefreshPasswordLink(dto: IGenerateRefreshPasswordLinkEmployeeDto): Promise<GenerateRefreshPasswordLinkEmployee.Response>;
    confirm(code: string): Promise<ConfirmRefreshPasswordLinkEmployee.Response>;
}
