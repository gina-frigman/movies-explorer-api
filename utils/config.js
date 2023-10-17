const { NODE_ENV, JWT_SECRET, MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'very-secret-key';
module.exports = MONGO_DB;
