export interface Configuration {
    port: number;
    debugLogging: boolean;
    //dbSslConn: boolean;
    //jwtSecret: string;
    databaseUrl: string;
    dbEntitiesPath: string[];
    //cronJobExpression: string;
    jwt: {
        accessTokenSecret: string;
        accessTokenLife: string;
        refreshTokenSecret: string;
        refreshTokenLife: string;
    };
}