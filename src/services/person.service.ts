import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { PersonEntity } from '../entities/person.entity';
import * as errors from '../helpers/errors.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { outApi } from '../helpers/response.helper';
import { OKHttpCode } from '../utils/constants/status-http.constant';
import { Authorized } from 'routing-controllers';

@Service()
export class PersonService extends BaseService<PersonEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(PersonEntity));
    }

    saveNewPerson = async (personEntity: PersonEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, (await this.repository.save(personEntity)).Id);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updatePerson = async (personEntity: PersonEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, await this.repository.save(personEntity));
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deletePerson = async (personEntity: PersonEntity): Promise<BaseResponseInterface> => {

        try {
            return outApi(OKHttpCode, (await this.repository.remove(personEntity)).Id);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllPerson = async (): Promise<BaseResponseInterface> => {
        try {
            return outApi(OKHttpCode, await this.repository.find());
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findPerson = async (queryObj: Record<string, any>): Promise<BaseResponseInterface> => {

        let result;

        try {
            result = await this.repository.find(queryObj);
        } catch (error) {
            throw new errors.InternalServerError();
        }

        if (result === null) throw new errors.PersonNotFound();

        return outApi(OKHttpCode, result);
    }
}