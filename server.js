require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const Schema = mongoose.Schema;
const { MONGODB_URI, PORT, FRONTEND_URL } = process.env;
const app = express();

const corsOptions = {
  origin: FRONTEND_URL,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type',
  methods: 'GET, PUT, POST, DELETE',
};

app.use(cors(corsOptions));

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

function onDBConnected(){
  console.log('we are connected to mongo db');
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', onDBConnected);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next)=>{
    console.log('run it');
    if(req.body) {
      console.log(req.body);
    }
    next();
  });
}

app.get('/test', function(req, res){
  res.status(200);
  res.json({'message': 'worked!'});
});

const testSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Test = mongoose.model('Test', testSchema);

app.post('/api/test/new', function(req, res) {
  Test.create({...req.body}, (err, savedTest) => {
    if (err) return res.status(400).json(err);
    res.status(201).json(savedTest);
  });
});

app.get('/api/test/all', function(req, res) {
  Test.find({}, (err, tests) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(tests);
  });
});

app.delete('/api/test/delete', function(req, res) {
  const { _id } = req.body;
  Test.findByIdAndDelete(_id, function(err, deletedTest){
    if (err) return res.status(400).json(err);
    res.status(200).json(deletedTest);
  });
});

app.listen(PORT, function(){
  console.log('we are running on ' + PORT);
});
