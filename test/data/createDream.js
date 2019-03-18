const { 
  _id,
  DREAM_TITLE_CRUD: title,
  DREAM_CONTENT_CRUD: content,
  DREAM_USERID_CRUD: userId,
} = require('../../constants');

const {
  imageData,
  bodyImagesData
} = require('./image');

const req = {
  body: {
    images: [...bodyImagesData],
    title,
    content,
    userId,
  }
};

const reqArrErr = {
  body: {
    images: 'not good'
  }
};

const reqImagesEmpty = {
  body: {}
};

const dreamData = { ...req.body, images: [...imageData] };
const expectedResult = { _id, images: [...imageData], title, content, userId};
module.exports = { 
  req,
  reqArrErr,
  reqImagesEmpty,
  imageData, 
  dreamData, 
  expectedResult 
};
