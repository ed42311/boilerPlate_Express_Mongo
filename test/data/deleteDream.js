const { 
  _id,
  DREAM_TITLE_CRUD: title,
  DREAM_CONTENT_CRUD: content,
  DREAM_USERID_CRUD: userId,
} = require('../../constants');

const req = { body: { _id } };
const expectedResult = { title, content, _id,};

module.exports = { req, expectedResult };
