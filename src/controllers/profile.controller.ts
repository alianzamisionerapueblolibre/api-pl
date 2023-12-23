import { Get, JsonController } from 'routing-controllers';
import { ProfileService } from '../services/profile.service';
import { Service } from 'typedi';

@JsonController('/profile')
@Service()
export class ProfileController {
    constructor(private readonly service: ProfileService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }
}