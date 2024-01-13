
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { PersonEntity } from './person.entity';
import { ProfileUserEntity } from './profile-user.entity';
import { CourseTeacherEntity } from './course-teacher.entity';
import { PeriodCourseAttendanceEntity } from './period-course-attendance.entity';
import { PeriodCourseStudentEntity } from './period-course-student.entity';

@Entity({ name: 'T_User' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 50 })
    Username: string;

    @Column({ type: 'text' })
    Password: string;

    @Column()
    PersonId: number;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.User)
    @JoinColumn({ name: 'PersonId' })
    Person: PersonEntity;

    @Column({ length: 50 })
    UserCreated: string;

    @Column({ type: 'datetime' })
    DateCreated: Date;

    @Column({ length: 50, nullable: true })
    UserModified: string;

    @Column({ type: 'datetime', nullable: true })
    DateModified: Date;

    @OneToMany(() => ProfileUserEntity, (profile_user: ProfileUserEntity) => profile_user.Profile, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    ProfileUsers: Array<ProfileUserEntity>;

    @OneToMany(() => CourseTeacherEntity, (courseTeacher: CourseTeacherEntity) => courseTeacher.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    CourseTeachers: Array<CourseTeacherEntity>;

    @OneToMany(() => PeriodCourseAttendanceEntity, (periodCourseAtt: PeriodCourseAttendanceEntity) => periodCourseAtt.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourseAttendances: Array<PeriodCourseAttendanceEntity>;

    @OneToMany(() => PeriodCourseStudentEntity, (periodCourseStudent: PeriodCourseStudentEntity) => periodCourseStudent.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourseStudents: Array<PeriodCourseStudentEntity>;
}