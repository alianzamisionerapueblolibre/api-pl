import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { configurationGlobal } from '../providers/configuration.provider';
import * as errors from '../helpers/errors.helper';
import { DecodedJwtToken } from 'interfaces/authorization.interface';
import { UserEntity } from 'entities/user.entity';

@Service()
export class AuthorizationService {

    signAccessToken = ({ id, userName, expiresIn }: DecodedJwtToken): string => {
        return jwt.sign({ id, userName, expiresIn }, configurationGlobal.jwt.accessTokenSecret, {
            expiresIn: configurationGlobal.jwt.accessTokenLife
        });
    }

    signRefreshToken = (userName: string): string => {
        return jwt.sign({ userName }, configurationGlobal.jwt.refreshTokenSecret, {
            expiresIn: configurationGlobal.jwt.refreshTokenLife
        });
    }

    verifyToken = (token: string, type: string): DecodedJwtToken => {
        const secret = type === 'access' ? configurationGlobal.jwt.accessTokenSecret : configurationGlobal.jwt.refreshTokenSecret
        const result = jwt.verify(token, secret, { ignoreExpiration: true })

        if (typeof result === 'string' || (result.constructor === Object && !result.hasOwnProperty('username')))
            throw new errors.InvalidToken();

        return <DecodedJwtToken>result;
    }

    verifyTokenUsername = (userName: string, userEntity: UserEntity): void => {
        if (userName !== userEntity.Username) throw new errors.UserPermissionDenied();
    }
}