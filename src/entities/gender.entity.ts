
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ name: 'T_Gender' })
export class GenderEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 2 })
    Code: string;

    @Column({ length: 50 })
    Description: string;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.Gender, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Person: PersonEntity;
}