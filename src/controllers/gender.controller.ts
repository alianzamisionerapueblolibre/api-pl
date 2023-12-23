import { Get, JsonController } from 'routing-controllers';
import { GenderService } from '../services/gender.service';
import { Service } from 'typedi';

@JsonController('/gender')
@Service()
export class GenderController {
    constructor(private readonly service: GenderService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }
}