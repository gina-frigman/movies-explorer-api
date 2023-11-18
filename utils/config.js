const { PORT = 3000 } = process.env;
const { MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'very-secret-key' } = process.env;

module.exports = {
  PORT,
  MONGO_DB,
  NODE_ENV,
  JWT_SECRET,
};
