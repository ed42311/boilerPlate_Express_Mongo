const { Dream } = require('./models');

module.exports = {
  createDream: function createDream(req, res){
    Dream.create(req.body, function(err, savedDream){
      if (err) return res.status(400).json(err);
      res.status(201).json(savedDream);
    })
  }
}
