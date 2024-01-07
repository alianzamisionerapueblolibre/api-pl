import { UserPersonRequestInterface } from '../interfaces/request/userperson-request.interface';
import { MapperPersonRequestToEntity } from '../mappers/person.mapper';
import { MapperProfileUserRequestToEntity } from '../mappers/profile-user.mapper';
import { MapperUserRequestToEntity } from '../mappers/user.mapper';
import { Body, JsonController, Post, Put } from 'routing-controllers';
import { PersonService } from '../services/person.service';
import { ProfileUserService } from '../services/profile-user.service';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { personUpdateMessage, registerUserPersonMessage, userProfileNewMessage } from '../utils/constants/message-http.constant';
import { PersonRequestInterface } from '../interfaces/request/person-request.interface';
import { PersonEntity } from '../entities/person.entity';
import { UserProfileRequestInterface } from '../interfaces/request/userprofile-request.interface';
import { ProfileUserEntity } from '../entities/profile-user.entity';

@JsonController('/user-person')
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

        const resultProfileUser = await this.profileUserService.saveNewProfileUser(profileuser);

        if (resultProfileUser.status !== OKHttpCode) return resultProfileUser;

        return outApi(OKHttpCode, registerUserPersonMessage);
    }
}