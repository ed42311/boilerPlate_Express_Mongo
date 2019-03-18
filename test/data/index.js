const createDreamData =  require('./createDream');
const deleteDreamData =  require('./deleteDream');
const updateDreamData =  require('./updateDream');
const findDreamData =  require('./findDream');
const reqEmptyErr = {};
module.exports = {
  createDreamData,
  deleteDreamData,
  updateDreamData,
  findDreamData,
  reqEmptyErr
};