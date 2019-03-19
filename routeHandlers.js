const {
  CREATE_DREAM,
  DELETE_DREAM,
  EDIT_DREAM,
  GET_DREAMS_BY_USERID,
  ERR_ARR,
  ERR_BODY,
  ERR_IMG,
  ERR_QUERY,
  ERR_ID,
  ERR_CONTENT,
  ERR_USERID
} = require('./constants');

const { Dream, Image } = require('./models');

const bodyValid = (req, res, type) => {
  switch (type) {
  case CREATE_DREAM:
    if(!req.body) {
      return res.status(400).json({ error: ERR_BODY });
    } else {
      if (!req.body.images) {
        return res.status(400).json({ error: ERR_IMG });
      } else if (!Array.isArray(req.body.images)) {
        return res.status(400).json({ error: ERR_ARR });
      } else {
        return true;
      }
    }
    break;
  case GET_DREAMS_BY_USERID:
    if (!req.query) {
      return res.status(400).json({ error: ERR_QUERY });
    } else {
      if (!req.query.userId) {
        return res.status(400).json({ error: ERR_USERID });
      } else {
        return true;
      }
    }
    break;
  case EDIT_DREAM:
    if(!req.body) {
      return res.status(400).json({ error: ERR_BODY });
    } else {
      if (!req.body._id) {
        return res.status(400).json({ error: ERR_ID });
      } else if (!req.body.title || !req.body.content || !req.body.userId) {
        return res.status(400).json({ error: ERR_CONTENT });
      } else {
        return true;
      }
    }
    break;
  case DELETE_DREAM:
    if(!req.body) {
      return res.status(400).json({ error: ERR_BODY });
    } else {
      if (!req.body._id) {
        return res.status(400).json({ error: ERR_ID });
      } else {
        return true;
      }
    }
    break;
  default:
    break;
  }
};

module.exports = {
  [CREATE_DREAM](req, res) {
    if(bodyValid(req, res, CREATE_DREAM)) {
      Image.create(req.body.images, (err, savedImages) => {
        if (err) return res.status(400).json(err);
        Dream.create({...req.body, images: savedImages}, (err, savedDream) => {
          if (err) return res.status(400).json(err);
          res.status(201).json(savedDream);
        });
      });
    }
  },
  [GET_DREAMS_BY_USERID](req, res) {
    if(bodyValid(req, res, GET_DREAMS_BY_USERID)) {
      Dream.find(req.query).populate('images').then(function(dreams, err){
        if (err) return res.status(500).json(err);
        res.status(200).json(dreams);
      });
    }
  },
  [EDIT_DREAM](req, res){
    if(bodyValid(req, res, EDIT_DREAM)) {
      const { _id, title, content, userId, images } = req.body;
      const imagePromises = []
      for (let i = 0; i < images.length; i++) {
        imagePromises.push(Image.findByIdAndUpdate(
          images[i]._id,
          { caption: images[i].caption },
          { new: true },
          (err, savedImage) => {
           if (err) return res.status(400).json(err);
        }).exec())
      }
      Promise.all(imagePromises)
        .then(()=> {
          Dream.findByIdAndUpdate(
            _id,
            {title, content, userId, images},
            {new: true},
            function(err, editedDream){
              if (err) return res.status(400).json(err);
              res.status(200).json(editedDream);
            }
          );
        })
    }
  },
  [DELETE_DREAM]: function(req, res){
    if(bodyValid(req, res, DELETE_DREAM)) {
      const { _id } = req.body;
      Dream.findByIdAndDelete(_id, function(err, deletedDream){
        if (err) return res.status(400).json(err);
        res.status(200).json(deletedDream);
      });
    }
  }
};
