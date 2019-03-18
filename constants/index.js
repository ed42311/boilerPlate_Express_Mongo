const methods = require('./methods');
const errors = require('./errors');
const data = require('./data');

module.exports = {
  ...methods,
  ...errors,
  ...data
};