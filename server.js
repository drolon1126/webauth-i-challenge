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
  let user = req.body;

  if (user.username && user.password) {
    user.password = bcrypt.hashSync(user.password, 14);

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({message:'There was a problem adding user'});
      });
  } else {
    res.status(400).json({ message: 'Please submit a username and password' });
  }
});

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    Users.findByUN(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    })
    .catch(error => {
      res.status(500).json({message:'There was a problem getting user'});
    });
  }

});

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'There was a problem getting users' });
    })
});

module.exports = server;