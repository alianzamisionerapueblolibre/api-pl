import { ProfileUserEntity } from 'entities/profile-user.entity';
import { merge } from 'object-mapper';

export const MapperProfileUserRequestToEntity = (input: any): ProfileUserEntity => {

    return (merge(input, {
        'profileId': 'ProfileId',
        'userId': 'UserId'
    })) as ProfileUserEntity;
}