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

// Setup a connection to mongoose and runs the initial command
// after open has occured
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', onDBConnected);

//  This pulls json data out of the req and handles forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//  This is some basic middleware that logs the request body
//  if there is one in development only, nice for debugging
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next)=>{
    console.log('run it');
    if(req.body) {
      console.log(req.body);
    }
    next();
  });
}


//  A test route, if this isn't working then you know you need
//  to debug something under the hood
app.get('/test', function(req, res){
  res.status(200);
  res.json({'message': 'worked!'});
});

// Basic schema setup, these are usaully broken out, but this is
// left in here for simplicities sake
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

// Attach the model to the db and call the collection test
const Test = mongoose.model('Test', testSchema);

//  Basic crud routes
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
