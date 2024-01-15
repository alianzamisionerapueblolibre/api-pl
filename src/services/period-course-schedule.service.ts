import { Service } from 'typedi';
import { BaseService } from './base/base.service';
import { PeriodCourseScheduleEntity } from '../entities/period-course-schedule.entity';
import { DataSource } from 'typeorm';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import * as errors from '../helpers/errors.helper';

@Service()
export class PeriodCourseScheduleService extends BaseService<PeriodCourseScheduleEntity> {

    constructor(db: DataSource) {
        super(db.getRepository(PeriodCourseScheduleEntity));
    }

    saveNewPeriodCourseSchedules = async (periodCourseScheduleEntities: PeriodCourseScheduleEntity[]): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, (await this.repository.save(periodCourseScheduleEntities)));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}