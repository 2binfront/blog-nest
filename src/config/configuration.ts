export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    pwd: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DATABASE,
  },
});
