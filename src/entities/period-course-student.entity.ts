import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PeriodCourseEntity } from './period-course.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'T_PeriodCourseStudent' })
export class PeriodCourseStudentEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    PeriodCourseId: number;

    @ManyToOne(() => PeriodCourseEntity, (periodCourse: PeriodCourseEntity) => periodCourse.PeriodCourseStudents)
    @JoinColumn({ name: 'PeriodCourseId' })
    PeriodCourse: PeriodCourseEntity;

    @Column()
    UserId: number;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.PeriodCourseStudents)
    @JoinColumn({ name: 'UserId' })
    User: UserEntity;
}