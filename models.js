const mongoose = require('mongoose');
const dreamSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {
  Dream
};
