import 'reflect-metadata';
import * as Koa from 'koa';
import { DefaultState, DefaultContext } from 'koa';
import { createKoaServer, useContainer } from 'routing-controllers';
import { config } from 'dotenv';
import '@colors/colors'
import { mysqlDataSource } from './providers/connectionbd.provider';
import { Container } from 'typedi';
import { services } from './services/index.service';
import path from 'path';

const port = 3000;

config();

const startApp = async () => {

    const app: Koa<DefaultState, DefaultContext> = createKoaServer({
        controllers: [path.join(__dirname + '/controllers/*.ts')],
    });

    const connectionBD = await mysqlDataSource.initialize();

    services.forEach((service) => {
        Container.set(service, new service(connectionBD));
    });

    useContainer(Container);

    app
        .listen(port)
        .on('listening', () =>
            console.log(
                `sever started on port=${port} go to http://localhost:${port}`.blue.bold
            )
        )
};

startApp();