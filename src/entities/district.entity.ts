
import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ name: 'T_District' })
export class DistrictEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.District, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Person: PersonEntity;
}