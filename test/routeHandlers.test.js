const sinon = require('sinon');
const mongoose = require('mongoose');
const assert = require('assert');

const {
  CREATE_DREAM,
  DELETE_DREAM,
  EDIT_DREAM,
  GET_DREAMS_BY_USERID,
} = require('../constants');

const {
  getDreamsByUserId,
  createDream,
  deleteDream,
  editDream,
  createDreamErrors
} = require('../routeHandlers');

// Import data for tests
const {
  createDreamData,
  deleteDreamData,
  updateDreamData,
  findDreamData,
  reqEmptyErr
} = require('./data');

const { Dream, Image } = require('../models');

describe('Restful API handlers for dreams', function() {
  let res = {};

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const spy = sinon.spy();
    res = {
      json: spy,
      status: sinon.stub().returns({json: spy})
    };
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should be able to create a Dream with create()' +
    '\n\t and an array of Image models with create()', function () {
    // destructure data for test, scoped to block
    const {
      req,
      imageData,
      dreamData,
      expectedResult,
    } = createDreamData;

    sandbox.stub(Image, 'create').yields(null, imageData);
    sandbox.stub(Dream, 'create').yields(null, expectedResult);
    createDream(req, res);
    sinon.assert.calledWith(Image.create, req.body.images);
    sinon.assert.calledWith(Dream.create, dreamData);
    sinon.assert.calledWith(
      res.status,
      sinon.match(201)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match(expectedResult)
    );
  });

  it('should be able to delete a Dream with findByIdAndDelete()', function(){
    // destructure data for delete test, scoped to block
    const {
      req,
      imageData,
      dreamData,
      expectedResult,
    } = deleteDreamData;
    const { _id: id } = req.body;

    sandbox.stub(Dream, 'findByIdAndDelete').yields(null, expectedResult);
    deleteDream(req, res);
    sinon.assert.calledWith(Dream.findByIdAndDelete, id);
    sinon.assert.calledWith(
      res.status,
      sinon.match(200)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match(expectedResult)
    );
  });

  xit('should be able to update a Dream findByIdAndUpdate()', function(){
    const {
      req,
      imageData,
      dreamData,
      expectedResult,
    } = updateDreamData;

    const { _id: id, title, content, userId } = req.body;

    sandbox.stub(Dream, 'findByIdAndUpdate').yields(null, expectedResult);
    editDream(req, res);
    sinon.assert.calledWith(
      Dream.findByIdAndUpdate,
      id,
      {title, content, userId},
      {new: true}
    );
    sinon.assert.calledWith(
      res.status,
      sinon.match(200)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match(expectedResult)
    );
  });

  it('should return an array of Dreams by userId Dream with find()' +
     '\n\t and an array of populated Images should be returned as well', function(){
    const {
      req,
      imageData,
      dreamData,
      expectedResult,
    } = findDreamData;


    sandbox.stub(Dream, 'find').returns({
      populate: sinon.stub().returns({
        then: sinon.stub().yields(expectedResult, null)
      })
    });

    getDreamsByUserId(req, res);
    sinon.assert.calledWith(
      Dream.find,
      req.query
    );
    sinon.assert.calledWith(
      res.status,
      sinon.match(200)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match(expectedResult)
    );
  });
});
