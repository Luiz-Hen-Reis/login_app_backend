import { Dialect, Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const dialect = process.env.DIALECT as Dialect;
const host = process.env.HOST as string;
const port = Number(process.env.PORT as string);
const database = process.env.DATABASE as string;
const username = process.env.USER as string;
const password = process.env.PASS as string;

export const sequelize = new Sequelize({
  dialect,
  host,
  port,
  database,
  username,
  password,
  define: {
    underscored: true,
  },
});
