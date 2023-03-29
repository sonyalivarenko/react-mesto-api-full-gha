/* eslint-disable linebreak-style */
class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = DocumentNotFoundError;
