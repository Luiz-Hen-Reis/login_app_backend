require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASS,
  },
};
