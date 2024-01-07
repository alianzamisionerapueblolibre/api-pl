import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseService } from './base/base.service';
import * as errors from '../helpers/errors.helper';
import { bcryptCompareAsync, bcryptHashAsync } from '../helpers/crypto.helper';
import { UserEntity } from '../entities/user.entity';
import { outApi } from '../helpers/response.helper';
import { BaseResponseInterface } from '../interfaces/response/base-response.interface';
import { OKHttpCode } from '../utils/constants/status-http.constant';

@Service()
export class UserService extends BaseService<UserEntity> {
    constructor(db: DataSource) {
        super(db.getRepository(UserEntity));
    }

    findUser = async (queryObj: Record<string, any>): Promise<BaseResponseInterface> => {

        let result;

        try {
            result = await this.repository.findOne(queryObj);
        } catch (error) {
            throw new errors.InternalServerError();
        }

        if (result === null) throw new errors.UsersNotFound();

        return outApi(OKHttpCode, result);
    }

    ifExistsUser = async (queryObj: Record<string, any>): Promise<BaseResponseInterface> => {

        let result;

        try {
            result = await this.repository.findOne(queryObj);
        } catch (error) {
            throw new errors.InternalServerError();
        }

        if (result === null) throw new errors.UserAlreadyExists();

        return outApi(OKHttpCode, true);
    }

    ifPasswordCorrect = async (unencryptedPassword: string, userEntity: UserEntity): Promise<BaseResponseInterface> => {

        if (!(await bcryptCompareAsync(unencryptedPassword, userEntity.Password)))
            throw new errors.InvalidUserPassword('Wrong Password');

        return outApi(OKHttpCode, true);;
    }

    saveNewUser = async (userEntity: UserEntity): Promise<BaseResponseInterface> => {

        try {
            userEntity.Password = await bcryptHashAsync(userEntity.Password, 8);
            return outApi(OKHttpCode, (await this.repository.save(userEntity)).Id);
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