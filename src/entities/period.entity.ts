import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PeriodCourseEntity } from './period-course.entity';

@Entity({ name: 'T_Period' })
export class PeriodEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @Column()
    DateStart: Date;

    @Column()
    DateEnd: Date;

    @OneToMany(() => PeriodCourseEntity, (periodCourse: PeriodCourseEntity) => periodCourse.Period, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    PeriodCourses: Array<PeriodCourseEntity>;
}