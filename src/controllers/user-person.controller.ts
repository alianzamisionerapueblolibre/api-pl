import { UserPersonRequestInterface } from 'interfaces/request/userperson-request.interface';
import { MapperPersonRequestToEntity } from 'mappers/person.mapper';
import { MapperProfileUserRequestToEntity } from 'mappers/profile-user.mapper';
import { MapperUserRequestToEntity } from 'mappers/user.mapper';
import { Body, JsonController, Post } from 'routing-controllers';
import { PersonService } from 'services/person.service';
import { ProfileUserService } from 'services/profile-user.service';
import { ProfileService } from 'services/profile.service';
import { UserService } from 'services/user.service';
import { Service } from 'typedi';
import { codeStudent } from 'utils/constants/profile.constant';

@JsonController('/user-person')
@Service()
export class UserPersonController {
    constructor(private readonly profileService: ProfileService,
        private readonly userService: UserService,
        private readonly personService: PersonService,
        private readonly profileuserService: ProfileUserService) { }

    @Post()
    async postUserPerson(@Body() request: UserPersonRequestInterface) {

        request.person.userCreated = 'admin';
        request.person.dateCreated = new Date();

        const person = MapperPersonRequestToEntity(request.person);

        const resultPerson = await this.personService.saveNewPerson(person);

        if (resultPerson.status !== 200) return resultPerson;

        request.user.person = { id: Number(resultPerson.body) };
        request.user.userCreated = 'admin';
        request.user.dateCreated = new Date();

        const user = MapperUserRequestToEntity(request.user);

        const resultUser = await this.userService.saveNewUser(user);

        if (resultUser.status !== 200) return resultPerson;

        const resultProfile = await this.profileService.findProfile({ Code: codeStudent });

        if (resultProfile.status !== 200) return resultProfile;

        const profileuser = MapperProfileUserRequestToEntity({ profileId: Number(resultProfile.body), userId: Number(resultUser.body) });

        return await this.profileuserService.saveNewProfileUser(profileuser);
    }

}