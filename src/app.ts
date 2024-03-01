import 'reflect-metadata';
import * as Koa from 'koa';
import path from 'path';
//import jwt from 'koa-jwt';
import '@colors/colors';
import { DefaultState, DefaultContext } from 'koa';
import { createKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { mysqlDataSource } from './providers/connectionbd.provider';
import { services } from './services/index.service';
import { authorizationChecker } from './validations/authorization-checker.validation';
//import { configurationGlobal } from './providers/configuration.provider';

const startApp = async () => {

    const app: Koa<DefaultState, DefaultContext> = createKoaServer({
        authorizationChecker: authorizationChecker,
        controllers: [path.join(__dirname + '/controllers/*.ts')],
        routePrefix: '/api',
    });

    const connectionBD = await mysqlDataSource.initialize();

    services.forEach((service) => {
        Container.set(service, new service(connectionBD));
    });

    useContainer(Container);

    // app.use(jwt({ secret: configurationGlobal.jwt.accessTokenSecret }).unless({ path: [/^\/assets|swagger-/] }))

    app
        .listen(process.env.PORT)
        .on('listening', () =>
            console.log(
                `sever started on port=${process.env.PORT} go to http://localhost:${process.env.PORT}`.blue.bold
            )
        )
};

startApp();