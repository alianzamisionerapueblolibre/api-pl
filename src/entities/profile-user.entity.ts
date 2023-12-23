
import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'T_ProfileUser' })
export class ProfileUserEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ProfileId: number;

    @ManyToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.ProfileUsers)
    @JoinColumn({ name: 'ProfileId' })
    Profile: ProfileEntity;

    @Column()
    UserId: number;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.ProfileUsers)
    @JoinColumn({ name: 'UserId' })
    User: UserEntity;

}