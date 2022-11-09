require("dotenv").config();

module.exports = {
  //   development: {
  //     username: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_DATABASE,
  //     host: process.env.DB_HOST,
  //     dialect: "mysql",
  //   },
  local: {
    username: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DATABASE,
    host: process.env.DB_LOCAL_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    host: process.env.DB_PROD_HOST,
    dialect: "mysql",
  },
};
