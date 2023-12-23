import { UserEntity } from 'entities/user.entity';
import { UserRequestInterface } from 'interfaces/request/user-request.interface';
import { merge } from 'object-mapper';

export const MapperUserRequestToEntity = (input: UserRequestInterface): UserEntity => {
    return (merge(input, {
        'userName': 'Username',
        'password': 'Password',
        'person.id': 'PersonId'
    })) as UserEntity;
};