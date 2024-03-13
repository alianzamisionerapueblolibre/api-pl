import { Authorized, Body, JsonController, Post } from 'routing-controllers';
import { PeriodService } from '../services/period.service';
import { Service } from 'typedi';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { PeriodOpenRequestInterface } from '../interfaces/request/period-open-request.interface';
import { PeriodEntity } from '../entities/period.entity';
import { outApi } from '../helpers/response.helper';
import { periodNewMessage } from '../utils/constants/message-http.constant';
import { PeriodCourseService } from '../services/period-course.service';
import { PeriodCourseEntity } from '../entities/period-course.entity';
import { PeriodCourseScheduleEntity } from '../entities/period-course-schedule.entity';
import { PeriodCourseScheduleService } from '../services/period-course-schedule.service';

@JsonController('/period')
@Authorized()
@Service()
export class PeriodController {
    constructor(
        private readonly periodService: PeriodService,
        private readonly periodCourseService: PeriodCourseService,
        private readonly periodCourseScheduleService: PeriodCourseScheduleService) { }

    @Post('/open')
    async postPeriodOpen(@Body() request: PeriodOpenRequestInterface) {

        const resultPeriod = await this.periodService.findAllPeriod();

        if (resultPeriod.status !== OKHttpCode) return resultPeriod;

        const newPeriodId = resultPeriod.body === null ? 1 : resultPeriod.body.length === 0 ? 1 :
            (resultPeriod.body[resultPeriod.body.length - 1].Id + 1);

        const resultSavePeriod = await this.periodService.saveNewPeriod({
            Id: newPeriodId, Description: request.description, DateStart: request.dateStart, DateEnd: request.dateEnd
        } as PeriodEntity);

        if (resultSavePeriod.status !== OKHttpCode) return resultSavePeriod;

        request.periodCourses.map(async x => {

            const resultSavePeriodCourse = await this.periodCourseService.saveNewPeriodCourses({
                PeriodId: (resultSavePeriod.body as PeriodEntity).Id,
                Classroom: x.classroom,
                CourseId: x.course.id
            } as PeriodCourseEntity);

            if (resultSavePeriodCourse.status === OKHttpCode) {

                const dataSchedules = x.schedules.map(x => ({
                    TimeStart: x.timeStart,
                    TimeEnd: x.timeEnd,
                    DayCourseOf: x.dayCourseOf,
                    PeriodCourseId: (resultSavePeriodCourse.body as PeriodCourseEntity).Id
                }) as PeriodCourseScheduleEntity);

                await this.periodCourseScheduleService.saveNewPeriodCourseSchedules(dataSchedules);
            }
        });

        return outApi(OKHttpCode, periodNewMessage);
    }
}