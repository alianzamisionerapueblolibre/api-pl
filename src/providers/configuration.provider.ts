import dotenv from 'dotenv';
import { Configuration } from 'interfaces/configuration.interface';

dotenv.config({ path: '.env' });

const isDevMode = process.env.NODE_ENV == 'development';

const configurationGlobal: Configuration = {
    port: +(process.env.PORT || 3000),
    debugLogging: isDevMode,
    //dbsslconn: !isDevMode,
    //jwtSecret: process.env.JWT_SECRET || "your-secret-whatever",
    databaseUrl: process.env.DATABASE_URL || 'mysql://admin:AdminPL2024@@localhost:3306/ChurchPLDB',
    dbEntitiesPath: [
        ...(isDevMode ? ['src/entities/**/*.ts'] : ['dist/entities/**/*.js'])
    ],
    //cronJobExpression: "0 * * * *"
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secretGodHand123',
        accessTokenLife: process.env.JWT_ACCESS_TOKEN_LIFE || '15m',
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secretSonGod342',
        refreshTokenLife: process.env.JWT_REFRESH_TOKEN_LIFE || '24h'
    }
};

export { configurationGlobal };