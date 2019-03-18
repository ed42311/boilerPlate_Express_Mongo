const { 
  _id,
  DREAM_TITLE_CRUD: title,
  DREAM_CONTENT_CRUD: content,
  DREAM_USERID_CRUD: userId,
} = require('../../constants');

const { imageData } = require('./image');

const req = { query: { userId } };
const reqQueryErr = { query: { } };
const expectedResult = [
  { _id, title, content, userId, images: [...imageData] },
  { _id: `${_id}a`, title, content, userId },
  { _id: `${_id}b`, title, content, userId },
];

module.exports = { 
  req,
  reqQueryErr,
  expectedResult 
};
