import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PeriodCourseEntity } from './period-course.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'T_PeriodCourseAttendance' })
export class PeriodCourseAttendanceEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    PeriodCourseId: number;

    @ManyToOne(() => PeriodCourseEntity, (periodCourse: PeriodCourseEntity) => periodCourse.PeriodCourseAttendances)
    @JoinColumn({ name: 'PeriodCourseId' })
    PeriodCourse: PeriodCourseEntity;

    @Column()
    UserId: number;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.PeriodCourseAttendances)
    @JoinColumn({ name: 'UserId' })
    User: UserEntity;

    @Column()
    TopicDate: Date;

    @Column()
    IsAttendance: boolean;
}
