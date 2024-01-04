import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { PersonEntity } from '../entities/person.entity';
import * as errors from '../helpers/errors.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { MapperMasterResponse } from '../mappers/master-response.mapper';

@Service()
export class PersonService extends BaseService<PersonEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(PersonEntity));
    }

    saveNewPerson = async (personEntity: PersonEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(200, (await this.repository.save(personEntity)).Id);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updatePerson = async (personEntity: PersonEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(200, (await this.repository.save(personEntity)).Id);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deletePerson = async (personEntity: PersonEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(200, (await this.repository.remove(personEntity)).Id);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllPerson = async (): Promise<BaseResponseInterface> => {
        try {
            return outApi(200, MapperMasterResponse(await this.repository.find()));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}