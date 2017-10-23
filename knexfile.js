
require("dotenv").load();
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.database,
      user: process.env.user,
      password: process.env.password,
    }
  },
};
