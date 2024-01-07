import { AuthRequestInterface } from '../interfaces/request/auth-request.interface';
import { Body, Get, JsonController, Put } from 'routing-controllers';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { PersonService } from '../services/person.service';
import { PersonEntity } from '../entities/person.entity';
import { userPasswordUpdateMessage } from '../utils/constants/message-http.constant';
import { UserRequestInterface } from '../interfaces/request/user-request.interface';
import { UserEntity } from '../entities/user.entity';
import { ProfileUserService } from '../services/profile-user.service';
import { ProfileUserEntity } from '../entities/profile-user.entity';

@JsonController('/auth')
@Service()
export class UserPersonController {

    constructor(
        private readonly userService: UserService,
        private readonly personService: PersonService,
        private readonly profileUserService: ProfileUserService
    ) { }

    @Put('/user/password')
    async putUserPassword(@Body() request: UserRequestInterface) {

        const resultUser = await this.userService.findUser({ where: { Id: request.id } });

        if (resultUser.status !== OKHttpCode) return resultUser;

        const updateUserData: UserEntity = {
            ...(resultUser.body as UserEntity),
            Id: request.id!,
            Password: request.password,
            UserModified: 'admin',
            DateModified: new Date()
        };

        const resultUserPassword = await this.userService.updateUserPassword(updateUserData);

        if (resultUserPassword.status !== OKHttpCode) return resultUserPassword;

        return outApi(OKHttpCode, userPasswordUpdateMessage);
    }

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

        return outApi(OKHttpCode, {
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
}