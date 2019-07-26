require('dotenv').config();

console.log(process.env.NODE_ENV);
const env = {
  port: process.env.PORT,
  useVariable: process.env.NODE_ENV === 'test'? 'DATABASE_URL_TEST' : 'DATABASE_URL',
  databaseUrl: process.env.NODE_ENV === 'test'? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
  databaseDialect: process.env.DATABASE_DIALECT,
  Node_env: process.env.NODE_ENV || 'production'
};

module.exports = env;
