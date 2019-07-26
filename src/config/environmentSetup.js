require('dotenv').config();

const env = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  databaseDialect: process.env.DATABASE_DIALECT
};

module.exports = env;
