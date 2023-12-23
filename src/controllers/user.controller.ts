import { ValidationError, validate } from 'class-validator';
import { UserRequestInterface } from 'interfaces/request/user-request.interface';
import { JsonController, Post, Body, UnauthorizedError } from 'routing-controllers';
import { UserService } from '../services/user.service';
import { LoginValidation } from 'validations/requests/login.validation';
import { Service } from 'typedi';
import { MapperUserRequestToEntity } from '../mappers/user.mapper';

@JsonController('/user')
@Service()
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    async post(@Body() userRequest: UserRequestInterface) {
        const user = MapperUserRequestToEntity(userRequest);

        return this.service.saveNewUser(user);
    }
}