import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { GenderEntity } from './gender.entity';
import { DistrictEntity } from './district.entity';
import { MaritalStatusEntity } from './marital-status.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'T_Person' })
export class PersonEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 50 })
    FirstName: string;

    @Column({ length: 50 })
    LastName: string;

    @Column({ length: 100 })
    Address: string;

    @Column({ length: 50, nullable: true })
    Email: string;

    @Column({ length: 10 })
    PhoneNumber: string;

    @Column({ length: 50 })
    UserCreated: string;

    @Column({ type: 'datetime' })
    DateCreated: Date;

    @Column({ length: 50, nullable: true })
    UserModified: string;

    @Column({ type: 'datetime', nullable: true })
    DateModified: Date;

    @Column()
    GenderId: number;

    @OneToOne(() => GenderEntity, (gender: GenderEntity) => gender.Person)
    @JoinColumn({ name: 'GenderId' })
    Gender: GenderEntity;

    @Column()
    DistrictId: number;

    @OneToOne(() => DistrictEntity, (district: DistrictEntity) => district.Person)
    @JoinColumn({ name: 'DistrictId' })
    District: DistrictEntity;

    @Column()
    MaritalStatusId: number;

    @OneToOne(() => MaritalStatusEntity, (marital_status: MaritalStatusEntity) => marital_status.Person)
    @JoinColumn({ name: 'MaritalStatusId' })
    MaritalStatus: MaritalStatusEntity;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.Person, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    User: UserEntity;
}