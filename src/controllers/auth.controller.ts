import { AuthRequestInterface } from '../interfaces/request/auth-request.interface';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { PersonService } from '../services/person.service';
import { PersonEntity } from '../entities/person.entity';
import { UserEntity } from '../entities/user.entity';
import { ProfileUserService } from '../services/profile-user.service';
import { ProfileUserEntity } from '../entities/profile-user.entity';
import { AuthorizationService } from '../services/authorization.service';
import { UserPersonRequestInterface } from '../interfaces/request/userperson-request.interface';
import { MapperPersonRequestToEntity } from '../mappers/person.mapper';
import { MapperUserRequestToEntity } from '../mappers/user.mapper';
import { MapperProfileUserRequestToEntity } from '../mappers/profile-user.mapper';
import { registerUserPersonMessage } from '../utils/constants/message-http.constant';

@JsonController('/auth')
@Service()
export class UserPersonController {

    constructor(
        private readonly userService: UserService,
        private readonly personService: PersonService,
        private readonly profileUserService: ProfileUserService,
        private readonly authorizationService: AuthorizationService
    ) { }

    @Get('/login')
    async getAuthUser(@Body() request: AuthRequestInterface) {

        const resultUserExist = await this.userService.ifExistsUser({ where: { Username: request.userName } });

        if (resultUserExist.status !== OKHttpCode) return resultUserExist;

        const resultUser = await this.userService.findUser({ where: { Username: request.userName } });

        if (resultUser.status !== OKHttpCode) return resultUser;

        const resultPassword = await this.userService.ifPasswordCorrect(request.password, resultUser.body);

        if (resultPassword.status !== OKHttpCode) return resultPassword;

        const resultProfilesUser = await this.profileUserService.findProfileUser({
            relations: ['Profile'],
            where: { UserId: (resultUser.body as UserEntity).Id }
        });

        const userProfiles = (resultProfilesUser.status !== OKHttpCode) ? [] :
            (resultProfilesUser.body as ProfileUserEntity[]).map(x => ({
                id: x.ProfileId,
                description: x.Profile.Description
            }));

        const resultPerson = await this.personService.findPerson({
            relations: ['MaritalStatus', 'Gender', 'District'],
            where: { Id: (resultUser.body).Id }
        });

        if (resultPerson.status !== OKHttpCode) return resultPerson;

        const person = (resultPerson.body[0]) as PersonEntity;

        const accessToken = this.authorizationService.signAccessToken({
            id: (resultUser.body).Id,
            username: (resultUser.body).Username
        });

        return outApi(OKHttpCode, {
            token: accessToken,
            id: person.Id, firstName: person.FirstName, lastName: person.LastName,
            address: person.Address, email: person.Email, phoneNumber: person.PhoneNumber,
            marital_status: {
                id: person.MaritalStatus.Id,
                description: person.MaritalStatus.Description
            },
            gender: {
                id: person.Gender.Id,
                description: person.Gender.Description
            },
            district: {
                id: person.District.Id,
                description: person.District.Description
            },
            profiles: userProfiles
        });
    }

    @Post('/register')
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

        const resultProfileUser = await this.profileUserService.saveNewProfileUser(profileuser);

        if (resultProfileUser.status !== OKHttpCode) return resultProfileUser;

        return outApi(OKHttpCode, registerUserPersonMessage);
    }
}