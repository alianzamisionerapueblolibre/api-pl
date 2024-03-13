import { Service } from 'typedi';
import { BaseService } from './base/base.service';
import { DataSource } from 'typeorm';
import { PeriodCourseEntity } from '../entities/period-course.entity';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import * as errors from '../helpers/errors.helper';
import { Authorized } from 'routing-controllers';

@Service()
@Authorized()
export class PeriodCourseService extends BaseService<PeriodCourseEntity> {

    constructor(db: DataSource) {
        super(db.getRepository(PeriodCourseEntity));
    }

    saveNewPeriodCourses = async (periodCourseEntity: PeriodCourseEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, (await this.repository.save(periodCourseEntity)));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}