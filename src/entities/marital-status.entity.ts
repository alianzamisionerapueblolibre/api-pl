import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({ name: 'T_MaritalStatus' })
export class MaritalStatusEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.MaritalStatus, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Person: PersonEntity;
}