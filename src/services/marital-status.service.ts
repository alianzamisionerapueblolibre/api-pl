import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { MaritalStatusEntity } from '../entities/marital-status.entity';
import * as errors from '../helpers/errors.helper';

@Service()
export class MaritalStatusService extends BaseService<MaritalStatusEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(MaritalStatusEntity));
    }

    saveNewMaritalStatus = async (maritalStatusEntity: MaritalStatusEntity): Promise<MaritalStatusEntity> => {

        try {
            return await this.repository.save(maritalStatusEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updateMaritalStatus = async (maritalStatusEntity: MaritalStatusEntity): Promise<MaritalStatusEntity> => {

        try {
            return await this.repository.save(maritalStatusEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteMaritalStatus = async (maritalStatusEntity: MaritalStatusEntity): Promise<MaritalStatusEntity> => {

        try {
            return await this.repository.remove(maritalStatusEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllMaritalStatus = async (): Promise<MaritalStatusEntity[]> => {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}