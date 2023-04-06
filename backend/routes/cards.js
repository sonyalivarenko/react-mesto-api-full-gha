const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { customValidate } = require('../utils/customValidate');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { constRegex } = require('../utils/constRegex');

routerCard.get('/', getCards);
routerCard.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(customValidate),
  }),
}), deleteCard);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(constRegex),
  }),
}), createCard);
routerCard.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(customValidate),
  }),
}), likeCard);
routerCard.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(customValidate),
  }),
}), dislikeCard);

module.exports = { routerCard };
