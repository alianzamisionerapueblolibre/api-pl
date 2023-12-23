import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import { PersonEntity } from '../entities/person.entity';
import * as errors from '../helpers/errors.helper';

@Service()
export class PersonService extends BaseService<PersonEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(PersonEntity));
    }

    saveNewPerson = async (personEntity: PersonEntity): Promise<PersonEntity> => {

        try {
            return await this.repository.save(personEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updatePerson = async (personEntity: PersonEntity): Promise<PersonEntity> => {

        try {
            return await this.repository.save(personEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deletePerson = async (personEntity: PersonEntity): Promise<PersonEntity> => {

        try {
            return await this.repository.remove(personEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    findAllPerson = async (): Promise<PersonEntity[]> => {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}