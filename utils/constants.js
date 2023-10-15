const rateLimit = require('express-rate-limit');

module.exports.CREATED_STATUS = 201;
module.exports.INTERNAL_SERVER = 'ошибка сервера';
module.exports.UNAUTHORIZED = 'проблемы с авторизацией';
module.exports.NOT_FOUND = 'не найдено';
module.exports.BAD_REQUEST = 'ошибка введенных данных';
module.exports.FORBIDDEN = 'доступ воспрещен';
module.exports.CONFLICT = 'пользователь с такими данными уже существует';
module.exports.REQUIRED = 'поле обязательно для заполнения';
module.exports.MIN_SYMBOLS = 'минимальное количество символов - 2';
module.exports.MAX_SYMBOLS = 'максимальное количество символов - 30';
module.exports.INCORRECT_URL = 'неверно указан url';
module.exports.INCORRECT_EMAIL = 'неверно указан email';
module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
