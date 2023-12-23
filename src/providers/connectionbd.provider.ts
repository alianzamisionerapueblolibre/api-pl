import { DataSource } from 'typeorm';
import { configurationGlobal } from './configuration.provider';

export const mysqlDataSource = new DataSource({
    type: 'mysql',
    url: configurationGlobal.databaseUrl,
    entities: configurationGlobal.dbEntitiesPath,
    logging: false,
    synchronize: false
});