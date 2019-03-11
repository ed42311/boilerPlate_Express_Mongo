const { Dream } = require('./models');

module.exports = {
  createDream(req, res){
    Dream.create(req.body, function(err, savedDream){
      if (err) return res.status(400).json(err);
      res.status(201).json(savedDream);
    })
  },
  getDreams(req, res) {
    Dream.find(req.query, function(err, dreams){
      if (err) return res.status(500).json(err);
      res.status(200).json(dreams);
    })
  },
  editDream(req, res){
    const { title, content, _id, userId } = req.body;
    Dream.findByIdAndUpdate(
      _id, 
      {title, content, userId}, 
      {new: true}, 
      function(err, editedDream){
        if (err) return res.status(400).json(err);
        res.status(200).json(editedDream);
      }
    );
  },
  deleteDream: function(req, res){
    const { _id } = req.body
    Dream.findByIdAndDelete(_id, function(err, deletedDream){
      if (err) return res.status(400).json(err);
      res.status(200).json(deletedDream);
    })
  }
}
