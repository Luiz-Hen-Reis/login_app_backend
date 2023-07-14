import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "login_app_development",
  username: "postgres",
  password: "1234",
  define: {
    underscored: true,
  },
});
