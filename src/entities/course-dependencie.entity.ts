import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'T_CourseDependencie' })
export class CourseDependencieEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    CourseMainId: number;

    @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.DependencieMains)
    @JoinColumn({ name: 'CourseMainId' })
    CourseMain: CourseEntity;

    @Column()
    CourseDependencieId: number;

    @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.DependencieNecessaries)
    @JoinColumn({ name: 'CourseDependencieId' })
    CourseNecessary: CourseEntity;
}