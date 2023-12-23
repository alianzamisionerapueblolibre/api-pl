import { MasterResponseInterface } from 'interfaces/response/master-response.interface';

export const MapperMasterResponse = (input: any[]): MasterResponseInterface[] => {

    const result = input.map(value => ({
        id: value.Id,
        code: value.Code,
        description: value.Description
    } as MasterResponseInterface));

    return result;
}