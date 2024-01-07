import { UserPersonRequestInterface } from '../interfaces/request/userperson-request.interface';
import { MapperPersonRequestToEntity } from '../mappers/person.mapper';
import { MapperProfileUserRequestToEntity } from '../mappers/profile-user.mapper';
import { MapperUserRequestToEntity } from '../mappers/user.mapper';
import { Body, JsonController, Post } from 'routing-controllers';
import { PersonService } from '../services/person.service';
import { ProfileUserService } from '../services/profile-user.service';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { registerUserPersonMessage } from '../utils/constants/message-http.constant';

@JsonController('/user-person')
@Service()
export class UserPersonController {
    constructor(
        private readonly userService: UserService,
        private readonly personService: PersonService,
        private readonly profileuserService: ProfileUserService) { }

    @Post()
    async postUserPerson(@Body() request: UserPersonRequestInterface) {

        request.person.userCreated = 'admin';
        request.person.dateCreated = new Date();

        const person = MapperPersonRequestToEntity(request.person);

        const resultPerson = await this.personService.saveNewPerson(person);

        if (resultPerson.status !== OKHttpCode) return resultPerson;

        request.user.person = { id: Number(resultPerson.body) };
        request.user.userCreated = 'admin';
        request.user.dateCreated = new Date();

        const user = MapperUserRequestToEntity(request.user);

        const resultUser = await this.userService.saveNewUser(user);

        if (resultUser.status !== OKHttpCode) return resultPerson;

        const profileuser = MapperProfileUserRequestToEntity({ profileId: request.profile.id, userId: Number(resultUser.body) });

        const resultProfileUser = await this.profileuserService.saveNewProfileUser(profileuser);

        if (resultProfileUser.status !== OKHttpCode) return resultProfileUser;

        return outApi(OKHttpCode, registerUserPersonMessage);
    }
}