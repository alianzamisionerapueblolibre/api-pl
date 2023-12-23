import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { ProfileUserEntity } from '../entities/profile-user.entity';
import * as errors from '../helpers/errors.helper';

@Service()
export class ProfileUserService extends BaseService<ProfileUserEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(ProfileUserEntity));
    }

    saveNewProfileUser = async (profileUserEntity: ProfileUserEntity): Promise<ProfileUserEntity> => {

        try {
            return await this.repository.save(profileUserEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updateProfileUser = async (profileUserEntity: ProfileUserEntity): Promise<ProfileUserEntity> => {

        try {
            return await this.repository.save(profileUserEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteProfileUser = async (profileUserEntity: ProfileUserEntity): Promise<ProfileUserEntity> => {

        try {
            return await this.repository.remove(profileUserEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllProfileUser = async (): Promise<ProfileUserEntity[]> => {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}