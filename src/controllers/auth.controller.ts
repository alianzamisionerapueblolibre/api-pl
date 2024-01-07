import { AuthRequestInterface } from '../interfaces/request/auth-request.interface';
import { Body, Get, JsonController } from 'routing-controllers';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';

@JsonController('/auth')
@Service()
export class UserPersonController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    async getAuthUser(@Body() request: AuthRequestInterface) {

        const resultUserExist = await this.userService.ifExistsUser({ where: { Username: request.userName } });

        if (resultUserExist.status !== OKHttpCode) return resultUserExist;

        const resultUser = await this.userService.findUser({ where: { Username: request.userName } });

        if (resultUser.status !== OKHttpCode) return resultUser;

        const resultPassword = await this.userService.ifPasswordCorrect(request.password, resultUser.body);

        return resultPassword;
    }
}