import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'T_CourseTeacher' })
export class CourseTeacherEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    CourseId: number;

    @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.CourseTeachers)
    @JoinColumn({ name: 'CourseId' })
    Course: CourseEntity;

    @Column()
    UserId: number;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.CourseTeachers)
    @JoinColumn({ name: 'UserId' })
    User: UserEntity;
}