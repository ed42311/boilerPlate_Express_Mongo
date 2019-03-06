const sinon = require('sinon');
const mongoose = require('mongoose');

const {
  createDream,
} = require('./routeHandlers');
const { Dream } = require('./models');

let res = {};

let sandbox;

beforeEach(function(){
  sandbox = sinon.createSandbox();
  const spy = sinon.spy();
  res = {
    json: spy,
    status: sinon.stub().returns({json: spy})
  }
})
afterEach(function(){
  sandbox.restore();
})

it('should create a Dream', function(){
  let req = {
    body: {
      title: "Flying Dream",
      content: "Flying around magically",
    }
  };
  let expectedResult = {
    title: "Flying Dream",
    content: "Flying around magically",
    _id: new mongoose.Types.ObjectId(),
  };
  sandbox.stub(Dream, 'create').yields(null, expectedResult);
  createDream(req, res);
  sinon.assert.calledWith(Dream.create, req.body);
  sinon.assert.calledWith(
    res.json,
    sinon.match(expectedResult)
  )
})
