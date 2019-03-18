const { 
  _id,
  DREAM_TITLE_CRUD: title,
  DREAM_CONTENT_CRUD: content,
  DREAM_USERID_CRUD: userId,
} = require('../../constants');

const req = { body: { _id, title, content, userId } };
const reqBodyErr = { body: { } };
const reqBodyIdErr = { body: { _id } };
const expectedResult = { _id, title, content, userId };

module.exports = { 
  req,
  reqBodyErr,
  reqBodyIdErr,
  expectedResult
};
