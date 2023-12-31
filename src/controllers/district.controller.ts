import { Get, JsonController } from 'routing-controllers';
import { DistrictService } from '../services/district.service';
import { Service } from 'typedi';

@JsonController('/district')
@Service()
export class DistrictController {
    constructor(private readonly service: DistrictService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }
}