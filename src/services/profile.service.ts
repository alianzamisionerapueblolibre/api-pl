import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { ProfileEntity } from '../entities/profile.entity';
import * as errors from '../helpers/errors.helper';

@Service()
export class ProfileService extends BaseService<ProfileEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(ProfileEntity));
    }

    saveNewProfile = async (profileEntity: ProfileEntity): Promise<ProfileEntity> => {

        try {
            return await this.repository.save(profileEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updateProfile = async (profileEntity: ProfileEntity): Promise<ProfileEntity> => {

        try {
            return await this.repository.save(profileEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteProfile = async (profileEntity: ProfileEntity): Promise<ProfileEntity> => {

        try {
            return await this.repository.remove(profileEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllProfile = async (): Promise<ProfileEntity[]> => {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}