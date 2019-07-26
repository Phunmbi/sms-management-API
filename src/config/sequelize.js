const env = require('./environmentSetup.js');

const defaultConfig = {
  databaseUrl: env.databaseUrl,
  dialect: env.databaseDialect || 'postgres',
  use_env_variable: 'DATABASE_URL',
};

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
  },
  staging: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};

// Doesn't work with ES6 export syntax
module.exports = database;
