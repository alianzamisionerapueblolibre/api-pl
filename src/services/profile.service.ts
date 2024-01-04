import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { ProfileEntity } from '../entities/profile.entity';
import * as errors from '../helpers/errors.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { MapperMasterResponse } from '../mappers/master-response.mapper';

@Service()
export class ProfileService extends BaseService<ProfileEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(ProfileEntity));
    }

    findAll = async (): Promise<BaseResponseInterface> => {
        try {
            return outApi(200, MapperMasterResponse(await this.repository.find()));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findProfile = async (queryObj: Record<string, any>): Promise<BaseResponseInterface> => {

        let profile;

        try {
            profile = await this.repository.findOne(queryObj);
        } catch (error) {
            throw new errors.InternalServerError();
        }

        if (!profile) throw new errors.ProfileNotFound();

        return outApi(200, { code: profile.Code, id: profile.Id, description: profile.Description });
    }
}