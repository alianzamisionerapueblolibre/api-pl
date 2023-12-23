import { BaseResponseInterface } from 'interfaces/response/base-response.interface';

export const outApi = (status: number, body?: any): BaseResponseInterface => {

    return { status, body } as BaseResponseInterface;
}
