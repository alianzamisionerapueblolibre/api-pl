import { AuthRequestInterface } from '../interfaces/request/auth-request.interface';
import { Body, Get, JsonController } from 'routing-controllers';
import { UserService } from '../services/user.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { outApi } from '../helpers/response.helper';
import { PersonService } from '../services/person.service';
import { PersonEntity } from '../entities/person.entity';

@JsonController('/auth')
@Service()
export class UserPersonController {

    constructor(
        private readonly userService: UserService,
        private readonly personService: PersonService
    ) { }

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