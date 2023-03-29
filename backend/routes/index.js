/* eslint-disable linebreak-style */
const { routerUser } = require('./users');
const { routerCard } = require('./cards');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.use('/users', routerUser);
router.use('/cards', routerCard);
router.use(() => {
  throw new DocumentNotFoundError('Страница не найдена');
});

module.exports = { router };
