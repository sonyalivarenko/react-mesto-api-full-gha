/* eslint-disable linebreak-style */
const { routerUser } = require('./users');
const { routerCard } = require('./cards');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.use('/users', routerUser);
router.use('/cards', routerCard);
router.use((req, res, next) => {
  next(new DocumentNotFoundError('Ошибка авторизации'));
});

module.exports = { router };
