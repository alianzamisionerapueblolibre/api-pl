import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { DistrictEntity } from '../entities/district.entity';
import * as errors from '../helpers/errors.helper';

@Service()
export class DistrictService extends BaseService<DistrictEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(DistrictEntity));
    }

    saveNewDistrict = async (districtEntity: DistrictEntity): Promise<DistrictEntity> => {

        try {
            return await this.repository.save(districtEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updateDistrict = async (districtEntity: DistrictEntity): Promise<DistrictEntity> => {

        try {
            return await this.repository.save(districtEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteDistrict = async (districtEntity: DistrictEntity): Promise<DistrictEntity> => {

        try {
            return await this.repository.remove(districtEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllDistrict = async (): Promise<DistrictEntity[]> => {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}