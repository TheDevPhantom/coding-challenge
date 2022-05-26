import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config({ path: `./config/${process.env.NODE_ENV}.env` });

export default new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
