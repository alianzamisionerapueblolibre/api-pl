import { BaseContext } from 'koa'

export class ResponseHelper {

    outApiCall = (
        context: BaseContext,
        status: number,
        body?: Record<string, any> | string | Array<Record<string, any>>,
    ): void => {
        context.status = status;
        context.body = body;
    }
}