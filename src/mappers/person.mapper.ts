import { PersonEntity } from 'entities/person.entity';
import { merge } from 'object-mapper';

export const MapperPersonRequestToEntity = (input: any): PersonEntity => {

    return (merge(input, {
        'firstName': 'FirstName',
        'lastName': 'LastName',
        'address': 'Address',
        'email': 'Email',
        'phoneNumber': 'PhoneNumber',
        'gender.id': 'GenderId',
        'district.id': 'DistrictId',
        'marital_status.id': 'MaritalStatusId',
        'userCreated': 'UserCreated',
        'dateCreated': 'DateCreated'
    })) as PersonEntity;
}