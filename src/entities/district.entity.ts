
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ name: 'T_District' })
export class DistrictEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 20 })
    Code: string;

    @Column({ length: 50 })
    Description: string;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.District, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Person: PersonEntity;
}