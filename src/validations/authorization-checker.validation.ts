
import 'reflect-metadata';
import { verify } from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { configurationGlobal } from '../providers/configuration.provider';
import { DecodedJwtToken } from '../interfaces/authorization.interface';
import jwt from 'jsonwebtoken';
import * as errors from '../helpers/errors.helper';

export const verifyToken = (token: string, type: string): boolean => {
    const secret = type === 'access' ? configurationGlobal.jwt.accessTokenSecret : configurationGlobal.jwt.refreshTokenSecret
    const result = jwt.verify(token, secret, { ignoreExpiration: true })

    if (typeof result === 'string' || (result.constructor === Object && !result.hasOwnProperty('username')))
        throw new errors.Unauthorized();

    return true;
}

export const authorizationChecker = async (
    action: Action,
    //roles: Role[]
): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
        const token = (action.request.headers['authorization'] || '').replace(
            'Bearer ',
            ''
        );

        if (!token) throw new errors.Unauthorized();

        const result = verifyToken(token, 'access');

        if (result) resolve(true);

        resolve(false);

        /*verify(token, configurationGlobal.jwt.accessTokenSecret, (err: any, decoeded: any) => {
            if (err) {
                throw new Error('Token expired or invalid.');
            }
            action.request.token = decoeded;

            resolve(true);

            if (roles.length > 0) {
                const hasRights =
                    roles.filter(r => r === (token as Claim).role).length > 0;
                if (hasRights === true) {
                    resolve(true);
                } else {
                    throw new Error("You don't have rights to do this operation");
                }
            } else {
                resolve(true);
            }
        });*/
    });
}