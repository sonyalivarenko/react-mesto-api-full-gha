/* eslint-disable consistent-return */
const mongoose = require('mongoose');

function customValidate(value) {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
}

module.exports = { customValidate };
