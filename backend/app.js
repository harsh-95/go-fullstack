const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://harsh:a297bS3DNkFDbsen@cluster0-2ztsq.mongodb.net/test?retryWrites=true&w=majority')
  .then(()=>{
    console.log('mongodb successfully connected');
  })
  .catch((error)=>{
    console.log('unable to connect');
    console.error(error);
  })

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
//MONGODB PW: a297bS3DNkFDbsen
//MONGO CONNECTION: mongodb+srv://harsh:<password>@cluster0-2ztsq.mongodb.net/test?retryWrites=true&w=majority