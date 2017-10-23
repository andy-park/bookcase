
client = require('./settings.json')
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: client.database,
      user: client.user,
      password: client.password,
    }
  },
};
