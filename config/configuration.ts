export default () => ({
    database: {
        uri: process.env.POSTGRES_DB_URI,
    },
    typeorm: {
        synchronize: process.env.TYPEORM_SYNC_SCHEMA === 'true',
    },
});
