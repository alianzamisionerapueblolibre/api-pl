
import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ name: 'T_Gender' })
export class GenderEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.Gender, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Person: PersonEntity;
}