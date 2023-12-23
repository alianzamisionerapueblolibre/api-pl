import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import * as errors from '../helpers/errors.helper';
import { bcryptCompareAsync, bcryptHashAsync } from '../helpers/crypto.helper';
import { UserEntity } from '../entities/user.entity';

@Service()
export class UserService extends BaseService<UserEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(UserEntity));
    }

    findUser = async (queryObj: Record<string, any>): Promise<UserEntity> => {

        let user;

        try {
            user = await this.repository.findOne(queryObj);
        } catch (error) {
            throw new errors.InternalServerError();
        }

        if (!user) throw new errors.UsersNotFound();

        return user;
    }

    ifExistsUser = async (queryObj: Record<string, any>): Promise<void> => {

        try {
            if (await this.repository.findOne(queryObj)) return;
        } catch (error) {
            throw new errors.InternalServerError();
        }

        throw new errors.UserAlreadyExists();
    }

    ifPasswordCorrect = async (unencryptedPassword: string, userEntity: UserEntity): Promise<void> => {
        if (!(await bcryptCompareAsync(unencryptedPassword, userEntity.Password)))
            throw new errors.InvalidUserPassword('Wrong Password');

        return;
    }

    saveNewUser = async (userEntity: UserEntity): Promise<UserEntity> => {

        try {
            userEntity.Password = await bcryptHashAsync(userEntity.Password, 8);
            return await this.repository.save(userEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    updateUser = async (userEntity: UserEntity): Promise<UserEntity> => {

        try {
            return await this.repository.save(userEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }

    deleteUser = async (userEntity: UserEntity): Promise<UserEntity> => {

        try {
            return await this.repository.remove(userEntity);
        } catch (error) {
            throw new errors.InternalServerError();
        }
    }
}