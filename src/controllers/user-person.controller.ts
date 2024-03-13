import { Authorized, Body, JsonController, Put } from 'routing-controllers';
import { PersonService } from '../services/person.service';
import { ProfileUserService } from '../services/profile-user.service';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { personUpdateMessage, userPasswordUpdateMessage, userProfileNewMessage } from '../utils/constants/message-http.constant';
import { PersonRequestInterface } from '../interfaces/request/person-request.interface';
import { PersonEntity } from '../entities/person.entity';
import { UserProfileRequestInterface } from '../interfaces/request/userprofile-request.interface';
import { ProfileUserEntity } from '../entities/profile-user.entity';
import { UserRequestInterface } from '../interfaces/request/user-request.interface';
import { UserEntity } from '../entities/user.entity';

@JsonController('/user-person')
@Authorized()
@Service()
export class UserPersonController {
    constructor(
        private readonly userService: UserService,
        private readonly personService: PersonService,
        private readonly profileUserService: ProfileUserService) { }

    @Put('/profile')
    async putProfileUser(@Body() request: UserProfileRequestInterface) {

        const resultUser = await this.userService.findUser({ where: { Id: request.userId } });

        if (resultUser.status !== OKHttpCode) return resultUser;

        const resultDeleteUser = await this.profileUserService.deleteProfileUser(request.userId);

        if (resultDeleteUser.status !== OKHttpCode) return resultDeleteUser;

        const newUserProfiles = request.profileIds.map(x => ({ ProfileId: x, UserId: request.userId }) as ProfileUserEntity);

        const resultUserProfiles = await this.profileUserService.saveNewProfileUserMassive(newUserProfiles);

        if (resultUserProfiles.status !== OKHttpCode) return resultUserProfiles;

        return outApi(OKHttpCode, userProfileNewMessage);
    }

    @Put()
    async putPerson(@Body() request: PersonRequestInterface) {

        const resultPerson = await this.personService.findPerson({
            relations: ['MaritalStatus', 'Gender', 'District',],
            where: { Id: request.id }
        });

        if (resultPerson.status !== OKHttpCode) return resultPerson;

        const updatePersonData: PersonEntity = {
            ...(resultPerson.body as PersonEntity),
            Id: request.id || (resultPerson.body as PersonEntity).Id,
            FirstName: request.firstName || (resultPerson.body as PersonEntity).FirstName,
            LastName: request.lastName || (resultPerson.body as PersonEntity).LastName,
            Address: request.address || (resultPerson.body as PersonEntity).Address,
            Email: request.email || (resultPerson.body as PersonEntity).Email,
            PhoneNumber: request.phoneNumber || (resultPerson.body as PersonEntity).PhoneNumber,
            GenderId: request.gender.id || (resultPerson.body as PersonEntity).GenderId,
            DistrictId: request.district.id || (resultPerson.body as PersonEntity).DistrictId,
            MaritalStatusId: request.marital_status.id || (resultPerson.body as PersonEntity).MaritalStatusId,
            UserModified: 'admin',
            DateModified: new Date()
        };

        const updatePerson = await this.personService.updatePerson(updatePersonData);

        if (updatePerson.status !== OKHttpCode) return updatePerson;

        return outApi(OKHttpCode, personUpdateMessage);
    }

    @Put('/password')
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
}