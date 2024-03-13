import 'reflect-metadata';
import { Action } from 'routing-controllers';
import { configurationGlobal } from '../providers/configuration.provider';
import jwt from 'jsonwebtoken';
import * as errors from '../helpers/errors.helper';

export const authorizationChecker = async (action: Action) => {
    return new Promise<boolean>((resolve, reject) => {

        const token = (action.request.headers['authorization'] || '').replace(
            'Bearer ',
            ''
        );

        if (!token) throw new errors.Unauthorized();

        const secret = configurationGlobal.jwt.accessTokenSecret;

        jwt.verify(token, secret, { ignoreExpiration: false }, (err) => {
            if (err) {
                reject(new errors.Unauthorized());
            } else {
                resolve(true);
            }
        });
    });
}