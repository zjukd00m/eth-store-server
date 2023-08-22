export default () => ({
    database: {
        url: process.env.POSTGRES_URL,
        hostname: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        name: process.env.POSTGRES_DATABASE,
    },
    typeorm: {
        synchronize: process.env.TYPEORM_SYNC_SCHEMA === 'true',
    },
    jwt: {
        key: process.env.JWT_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
});
