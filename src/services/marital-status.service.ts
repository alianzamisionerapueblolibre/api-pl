import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { MaritalStatusEntity } from '../entities/marital-status.entity';
import * as errors from '../helpers/errors.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { MapperMasterResponse } from '../mappers/master-response.mapper';
import { OKHttpCode } from '../utils/constants/status-http.constant';

@Service()
export class MaritalStatusService extends BaseService<MaritalStatusEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(MaritalStatusEntity));
    }

    findAll = async (): Promise<BaseResponseInterface> => {
        try {
            return outApi(OKHttpCode, MapperMasterResponse(await this.repository.find()));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}