import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { GenderEntity } from '../entities/gender.entity';
import * as errors from '../helpers/errors.helper';

@Service()
export class GenderService extends BaseService<GenderEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(GenderEntity));
    }

    saveNewGender = async (genderEntity: GenderEntity): Promise<GenderEntity> => {

        try {
            return await this.repository.save(genderEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updateGender = async (genderEntity: GenderEntity): Promise<GenderEntity> => {

        try {
            return await this.repository.save(genderEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteGender = async (genderEntity: GenderEntity): Promise<GenderEntity> => {

        try {
            return await this.repository.remove(genderEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllGender = async (): Promise<GenderEntity[]> => {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}