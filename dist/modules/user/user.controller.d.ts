import { RMQService } from 'nestjs-rmq';
import { UserGetInfo, UserUpdateInfo } from 'src/contracts';
import { IUpdateUserDto } from 'src/contracts/user/dto/updateUser.dto';
export declare class UserController {
    private readonly rmqService;
    constructor(rmqService: RMQService);
    getUserInfo({ id }: {
        id: any;
    }): Promise<UserGetInfo.Response>;
    updatUserInfo({ id }: {
        id: any;
    }, dto: IUpdateUserDto): Promise<UserUpdateInfo.Response>;
    getUserAvatar({ id }: {
        id: any;
    }): any;
    setUserAvatar({ id }: {
        id: any;
    }): any;
}
