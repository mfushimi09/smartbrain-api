
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex'); 
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
require('dotenv').config();


const db = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }

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
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(4000, () => {
  console.log('app is running on port 4000');
})
