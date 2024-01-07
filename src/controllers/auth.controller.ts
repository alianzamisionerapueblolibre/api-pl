import { AuthRequestInterface } from '../interfaces/request/auth-request.interface';
import { Body, Get, JsonController, Put } from 'routing-controllers';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { PersonService } from '../services/person.service';
import { PersonEntity } from '../entities/person.entity';
import { PersonRequestInterface } from '../interfaces/request/person-request.interface';
import { personUpdateMessage, userPasswordUpdateMessage } from '../utils/constants/message-http.constant';
import { UserRequestInterface } from '../interfaces/request/user-request.interface';
import { UserEntity } from '../entities/user.entity';

@JsonController('/auth')
@Service()
export class UserPersonController {

    constructor(
        private readonly userService: UserService,
        private readonly personService: PersonService
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

    @Put('/person')
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

    @Get('/login')
    async getAuthUser(@Body() request: AuthRequestInterface) {

        const resultUserExist = await this.userService.ifExistsUser({ where: { Username: request.userName } });

        if (resultUserExist.status !== OKHttpCode) return resultUserExist;

        const resultUser = await this.userService.findUser({ where: { Username: request.userName } });

        if (resultUser.status !== OKHttpCode) return resultUser;

        const resultPassword = await this.userService.ifPasswordCorrect(request.password, resultUser.body);

        if (resultPassword.status !== OKHttpCode) return resultPassword;

        const resultPerson = await this.personService.findPerson({
            relations: ['MaritalStatus', 'Gender', 'District',],
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
            }
        });
    }
}