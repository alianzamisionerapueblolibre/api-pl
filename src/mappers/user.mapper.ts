import { UserEntity } from "entities/user.entity";
import { UserRequestInterface } from "interfaces/request/user-request.interface";
import { merge } from "object-mapper";

export const MapperUserRequestToEntity = (input: UserRequestInterface): UserEntity => {
    const user = (merge(input, {
        'userName': 'Username',
        'password': 'Password',
        'person.id': 'PersonId'
    })) as UserEntity;

    return user;
};