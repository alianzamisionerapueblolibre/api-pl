import { UserEntity } from 'entities/user.entity';
import { merge } from 'object-mapper';

export const MapperUserRequestToEntity = (input: any): UserEntity => {
    return (merge(input, {
        'userName': 'Username',
        'password': 'Password',
        'person.id': 'PersonId',
        'userCreated': 'UserCreated',
        'dateCreated': 'DateCreated'
    })) as UserEntity;
};