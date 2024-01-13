import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'T_Category' })
export class CategoryEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @OneToMany(() => CourseEntity, (course: CourseEntity) => course.Category, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Courses: Array<CourseEntity>;
}