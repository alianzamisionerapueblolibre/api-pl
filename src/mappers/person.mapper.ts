import { PersonEntity } from 'entities/person.entity';
import { merge } from 'object-mapper';

export const MapperPersonRequestToEntity = (input: any): PersonEntity => {

    return (merge(input, {
        'person.firstName': 'FirstName',
        'person.lastName': 'LastName',
        'person.address': 'Address',
        'person.email': 'email',
        'person.phoneNumber': 'PhoneNumber',
        'person.gender.id': 'GenderId',
        'person.district.id': 'DistrictId',
        'person.marital_status.id': 'MaritalStatusId',
        'person.userCreated': 'UserCreated',
        'person.dateCreated': 'DateCreated'
    })) as PersonEntity;
}