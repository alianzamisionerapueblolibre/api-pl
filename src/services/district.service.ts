import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { DistrictEntity } from '../entities/district.entity';
import * as errors from '../helpers/errors.helper';
import { outApi } from '../helpers/response.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { MapperMasterResponse } from '../mappers/master-response.mapper';

@Service()
export class DistrictService extends BaseService<DistrictEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(DistrictEntity));
    }

    findAll = async (): Promise<BaseResponseInterface> => {
        try {
            return outApi(200, MapperMasterResponse(await this.repository.find()));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}