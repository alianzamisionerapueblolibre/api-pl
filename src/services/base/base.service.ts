import { ObjectLiteral, Repository } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
    public readonly repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }
}