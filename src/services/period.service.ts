import { Service } from 'typedi';
import { BaseService } from './base/base.service';
import { PeriodEntity } from '../entities/period.entity';
import { DataSource } from 'typeorm';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import * as errors from '../helpers/errors.helper';

@Service()
export class PeriodService extends BaseService<PeriodEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(PeriodEntity));
    }

    saveNewPeriod = async (periodEntity: PeriodEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, (await this.repository.save(periodEntity)).Id);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updatePeriod = async (periodEntity: PeriodEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, await this.repository.save(periodEntity));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllPeriod = async (): Promise<BaseResponseInterface> => {
        try {
            return outApi(OKHttpCode, await this.repository.find());
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}