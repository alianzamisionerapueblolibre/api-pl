
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { PersonEntity } from './person.entity';
import { ProfileUserEntity } from './profile-user.entity';

@Entity({ name: 'T_User' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 50 })
    Username: string;

    @Column({ type: 'varbinary', length: 255 })
    Password: string;

    @Column()
    PersonId: number;

    @OneToOne(() => PersonEntity, (person: PersonEntity) => person.User)
    @JoinColumn({ name: 'PersonId' })
    Person: PersonEntity;

    @Column({ length: 50 })
    UserCreated: string;

    @Column({ type: 'datetime' })
    DateCreated: Date;

    @Column({ length: 50, nullable: true })
    UserModified: string;

    @Column({ type: 'datetime', nullable: true })
    DateModified: Date;

    @OneToMany(() => ProfileUserEntity, (profile_user: ProfileUserEntity) => profile_user.Profile, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    ProfileUsers: Array<ProfileUserEntity>;
}