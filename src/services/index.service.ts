import { AuthorizationService } from './authorization.service';
import { DistrictService } from './district.service';
import { GenderService } from './gender.service';
import { MaritalStatusService } from './marital-status.service';
import { PersonService } from './person.service';
import { ProfileUserService } from './profile-user.service';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';

export const services = [
    UserService,
    AuthorizationService,
    DistrictService,
    GenderService,
    MaritalStatusService,
    PersonService,
    ProfileUserService,
    ProfileService
];