/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ValidationError = require('../errors/ValidationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET = 'secret' } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже существует'));
        return;
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if ((err instanceof mongoose.Error.ValidationError) || (err instanceof mongoose.Error.CastError)) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if ((err instanceof mongoose.Error.ValidationError) || (err instanceof mongoose.Error.CastError)) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports.getСurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
