import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { PeriodEntity } from './period.entity';
import { CourseEntity } from './course.entity';
import { PeriodCourseAttendanceEntity } from './period-course-attendance.entity';
import { PeriodCourseStudentEntity } from './period-course-student.entity';
import { PeriodCourseScheduleEntity } from './period-course-schedule.entity';

@Entity({ name: 'T_PeriodCourse' })
export class PeriodCourseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    PeriodId: number;

    @ManyToOne(() => PeriodEntity, (period: PeriodEntity) => period.PeriodCourses)
    @JoinColumn({ name: 'PeriodId' })
    Period: PeriodEntity;

    @Column()
    CourseId: number;

    @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.PeriodCourses)
    @JoinColumn({ name: 'CourseId' })
    Course: CourseEntity;

    @Column({ length: 10 })
    Classroom: string;

    @OneToMany(() => PeriodCourseAttendanceEntity, (periodCourseAtt: PeriodCourseAttendanceEntity) => periodCourseAtt.PeriodCourse, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourseAttendances: Array<PeriodCourseAttendanceEntity>;

    @OneToMany(() => PeriodCourseStudentEntity, (periodCourseStudent: PeriodCourseStudentEntity) => periodCourseStudent.PeriodCourse, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourseStudents: Array<PeriodCourseStudentEntity>;

    @OneToMany(() => PeriodCourseScheduleEntity, (periodCourseSchedule: PeriodCourseScheduleEntity) => periodCourseSchedule.PeriodCourse, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourseSchedules: Array<PeriodCourseScheduleEntity>;
}