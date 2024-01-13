import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CourseDependencieEntity } from './course-dependencie.entity';
import { CourseTeacherEntity } from './course-teacher.entity';
import { PeriodCourseEntity } from './period-course.entity';

@Entity({ name: 'T_Course' })
export class CourseEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @Column({ length: 250 })
    Details: string;

    @Column()
    CategoryId: number;

    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.Courses)
    @JoinColumn({ name: 'CategoryId' })
    Category: CategoryEntity;

    @OneToMany(() => CourseDependencieEntity, (courseDependencie: CourseDependencieEntity) => courseDependencie.CourseMain, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    DependencieMains: Array<CourseDependencieEntity>;

    @OneToMany(() => CourseDependencieEntity, (courseDependencie: CourseDependencieEntity) => courseDependencie.CourseNecessary, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    DependencieNecessaries: Array<CourseDependencieEntity>;

    @OneToMany(() => CourseTeacherEntity, (courseTeacher: CourseTeacherEntity) => courseTeacher.Course, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    CourseTeachers: Array<CourseTeacherEntity>;

    @OneToMany(() => PeriodCourseEntity, (periodCourse: PeriodCourseEntity) => periodCourse.Course, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourses: Array<PeriodCourseEntity>;
}