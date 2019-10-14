const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./data/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {

});

server.post('/api/login', (req, res) => {

});

server.get('/api/users',(req,res)=>{
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({message:'There was a problem getting users'});
    })
});

module.exports = server;