const sinon = require('sinon');
const mongoose = require('mongoose');
const assert = require('assert');

const {
  CREATE_DREAM,
  DELETE_DREAM,
  EDIT_DREAM,
  GET_DREAMS_BY_USERID,
  ERR_ARR,
  ERR_BODY,
  ERR_IMG,
  ERR_QUERY,
  ERR_CONTENT,
  ERR_USERID
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

describe('Restful API error handlers for dreams', function() {
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

  it(`${CREATE_DREAM}() should return error when req is empty`, function () {
    // destructure error data for test, scoped to block

    createDream(reqEmptyErr, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_BODY })
    );
  });

  it(`${CREATE_DREAM}() should return error when image is undefined`, function () {
    // destructure error data for test, scoped to block
    const {
      reqImagesEmpty: req
    } = createDreamData;

    createDream(req, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_IMG })
    );
  });

  it(`${CREATE_DREAM}() should return array error when not given an array`, function () {
    // destructure error data for test, scoped to block
    const {
      reqArrErr: req
    } = createDreamData;

    createDream(req, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_ARR })
    );
  });

  it(`${GET_DREAMS_BY_USERID}() should return error when not given a query`, function () {
    // destructure error data for test, scoped to block
    getDreamsByUserId(reqEmptyErr, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_QUERY })
    );
  });

  it(`${GET_DREAMS_BY_USERID}() should return error when not given a user id`, function () {
    // destructure error data for test, scoped to block
    const {
      reqQueryErr: req
    } = findDreamData;

    getDreamsByUserId(req, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_USERID })
    );
  });

  xit(`${EDIT_DREAM}() should return error when req is empty`, function () {
    // destructure error data for test, scoped to block
    editDream(reqEmptyErr, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_BODY })
    );
  });

  xit(`${EDIT_DREAM}() should return error when body is missing neccessary content`, function () {
    // destructure error data for test, scoped to block
    const {
      reqBodyIdErr: req
    } = updateDreamData;

    editDream(req, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_CONTENT })
    );
  });

  it(`${DELETE_DREAM}() should return error when req is empty`, function () {
    // destructure error data for test, scoped to block

    deleteDream(reqEmptyErr, res);
    sinon.assert.calledWith(
      res.status,
      sinon.match(400)
    );
    sinon.assert.calledWith(
      res.json,
      sinon.match({ error: ERR_BODY })
    );
  });
});
