import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { ProfileUserEntity } from '../entities/profile-user.entity';
import * as errors from '../helpers/errors.helper';
import { outApi } from '../helpers/response.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { OKHttpCode } from '../utils/constants/status-http.constant';

@Service()
export class ProfileUserService extends BaseService<ProfileUserEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(ProfileUserEntity));
    }

    saveNewProfileUserMassive = async (profileUserEntities: ProfileUserEntity[]): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, await this.repository.save(profileUserEntities));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    saveNewProfileUser = async (profileUserEntity: ProfileUserEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, await this.repository.save(profileUserEntity));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteProfileUser = async (userId: number): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, await this.repository.delete({ UserId: userId }));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findProfileUser = async (queryObj: Record<string, any>): Promise<BaseResponseInterface> => {

        let result;

        try {
            result = await this.repository.find(queryObj);
        } catch (error) {
            throw new errors.InternalServerError();
        }

        if (result === null) throw new errors.UserProfilesNotFound();

        return outApi(OKHttpCode, result);
    }
}