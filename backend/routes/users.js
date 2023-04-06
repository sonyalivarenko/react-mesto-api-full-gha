const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { customValidate } = require('../utils/customValidate');
const {
  getUsers, getUserId, updateAvatar, updateProfile, getСurrentUser,
} = require('../controllers/users');
const { constRegex } = require('../utils/constRegex');

routerUser.get('/', getUsers);
routerUser.get('/me', getСurrentUser);
routerUser.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(customValidate),
  }),
}), getUserId);
routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
routerUser.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(constRegex),
  }),
}), updateAvatar);

module.exports = { routerUser };
