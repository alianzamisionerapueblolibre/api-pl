import { Get, JsonController } from 'routing-controllers';
import { MaritalStatusService } from '../services/marital-status.service';
import { Service } from 'typedi';

@JsonController('/marital-status')
@Service()
export class MaritalStatusController {
    constructor(private readonly service: MaritalStatusService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }
}