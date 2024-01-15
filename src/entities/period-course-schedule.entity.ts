import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PeriodCourseEntity } from './period-course.entity';

export class PeriodCourseScheduleEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    TimeStart: string;

    @Column()
    TimeEnd: string;

    @Column()
    DayCourseOf: string;

    @Column()
    PeriodCourseId: number;

    @ManyToOne(() => PeriodCourseEntity, (periodCourse: PeriodCourseEntity) => periodCourse.PeriodCourseSchedules)
    @JoinColumn({ name: 'PeriodCourseId' })
    PeriodCourse: PeriodCourseEntity;
}