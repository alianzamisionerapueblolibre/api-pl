import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ name: 'T_MaritalStatus' })
export class MaritalStatusEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 2 })
    Code: string;

    @Column({ length: 50 })
    Description: string;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.MaritalStatus, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Person: PersonEntity;
}