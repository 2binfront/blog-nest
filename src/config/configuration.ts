export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database:
    process.env.DB_ENV === 'PROD'
      ? {
          type: process.env.PROD_DB_TYPE,
          host: process.env.PROD_DATABASE_HOST,
          port: parseInt(process.env.PROD_DATABASE_PORT, 10) || 5432,
          user: process.env.PROD_DATABASE_USER,
          pwd: process.env.PROD_DATABASE_PWD,
          db: process.env.PROD_DATABASE_DB,
        }
      : {
          type: process.env.DEV_DB_TYPE,
          host: process.env.DEV_DATABASE_HOST,
          port: parseInt(process.env.DEV_DATABASE_PORT, 10) || 5432,
          user: process.env.DEV_DATABASE_USER,
          pwd: process.env.DEV_DATABASE_PWD,
          db: process.env.DEV_DATABASE_DB,
        },
});
