const sinon = require('sinon');
const mongoose = require('mongoose');

const {
  getDreamsByUserId,
  createDream,
  deleteDream,
  editDream
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
      userId: "wxyzabc",
    }
  };
  let expectedResult = {
    title: "Flying Dream",
    content: "Flying around magically",
    userId: "wxyzabc",
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

it('should delete a Dream', function(){
  const id =  new mongoose.Types.ObjectId();
  let req = {
    body: {
      _id: id, 
    }
  };
  let expectedResult = {
    title: "Flying Dream",
    content: "Flying around magically",
    _id: id,
  };
  sandbox.stub(Dream, 'findByIdAndDelete').yields(null, expectedResult);
  deleteDream(req, res);
  sinon.assert.calledWith(Dream.findByIdAndDelete, id);
  sinon.assert.calledWith(
    res.json,
    sinon.match(expectedResult)
  )
})

it('should update a Dream', function(){
  const id =  new mongoose.Types.ObjectId();
  let req = {
    body: {
      _id: id, 
      title: "Flying Dream",
      content: "Flying around magically",
      userId: "wxyzabc"
    }
  };
  let expectedResult = {
    title: "Flying Dream",
    content: "Flying around magically",
    _id: id,
    userId: "wxyzabc"
  };
  const { title, content, userId } = req.body;
  sandbox.stub(Dream, 'findByIdAndUpdate').yields(null, expectedResult);
  editDream(req, res);
  sinon.assert.calledWith(
    Dream.findByIdAndUpdate, 
    id, 
    {title, content, userId}, 
    {new: true}
  );
  sinon.assert.calledWith(
    res.json,
    sinon.match(expectedResult)
  )
})

it('should get Dreams by user id', function(){
  const id =  new mongoose.Types.ObjectId();
  let req = {query:{userId: "wxyzabc"}}
  let expectedResult = {
    title: "Flying Dream",
    content: "Flying around magically",
    _id: id,
    userId: "wxyzabc"
  };
  sandbox.stub(Dream, 'find').yields(null, expectedResult);
  getDreamsByUserId(req, res);
  sinon.assert.calledWith(
    Dream.find,  
    req.query 
  );
  sinon.assert.calledWith(
    res.json,
    sinon.match(expectedResult)
  )
})