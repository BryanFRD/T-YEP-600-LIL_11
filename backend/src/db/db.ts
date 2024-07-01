import { Sequelize } from "sequelize";
import logger from "../logger/logger";

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number.parseInt(process.env.DB_PORT || '5432', 10),
  define:  {
    freezeTableName: true,
    timestamps: false
  }
})

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err: any) => {
    logger.error('Unable to connect to the database:', err);
  });

export { sequelize };