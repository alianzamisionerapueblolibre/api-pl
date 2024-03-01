import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { configurationGlobal } from '../providers/configuration.provider';
import * as errors from '../helpers/errors.helper';
import { DecodedJwtToken } from 'interfaces/authorization.interface';
import { UserEntity } from 'entities/user.entity';

@Service()
export class AuthorizationService {

    signAccessToken = ({ id, username }: DecodedJwtToken): string => {
        return jwt.sign({ id, username }, configurationGlobal.jwt.accessTokenSecret, {
            expiresIn: configurationGlobal.jwt.accessTokenLife
        });
    }

    signRefreshToken = (username: string): string => {
        return jwt.sign({ username }, configurationGlobal.jwt.refreshTokenSecret, {
            expiresIn: configurationGlobal.jwt.refreshTokenLife
        });
    }

    verifyTokenUsername = (username: string, userEntity: UserEntity): void => {
        if (username !== userEntity.Username) throw new errors.UserPermissionDenied();
    }
}