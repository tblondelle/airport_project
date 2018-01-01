// config/database.js

const config = {
    connection: {
        user:  process.env.SQL_USER,
        password: process.env.SQL_PASSWORD
    },
	database: process.env.SQL_DATABASE,
};


if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.connection.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}


module.exports = config;
