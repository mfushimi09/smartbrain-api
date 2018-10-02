
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex'); 
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db_connect = require('./db_connect');

const db = knex({
  client: db_connect.client,
  connection: db_connect.connection

  // client: '',
  // connection: {
  //   host : '127.0.0.1',
  //   user : 'username',
  //   password : 'your_password',
  //   database : 'your_database'
  // }

});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).json();
})

app.post('/signin', (req, res) => {  signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })


app.listen(4000, () => {
  console.log('app is running on port 4000');
})
