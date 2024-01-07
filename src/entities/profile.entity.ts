
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { ProfileUserEntity } from './profile-user.entity';

@Entity({ name: 'T_Profile' })
export class ProfileEntity {

    @PrimaryColumn()
    Id: number;

    @Column({ length: 50 })
    Description: string;

    @OneToMany(() => ProfileUserEntity, (profile_user: ProfileUserEntity) => profile_user.Profile, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    ProfileUsers: Array<ProfileUserEntity>;
}