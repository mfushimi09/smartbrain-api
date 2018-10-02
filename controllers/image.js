const Clarifai = require('clarifai');
require('dotenv').config();
const app = new Clarifai.App({
 apiKey: process.env.CLARIFI_API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if(entries.length) {
        res.json(entries[0])
      } else {
        res.status(400).json("Not found")
      }
  })
    .catch(err => res.status(400).json("error updating entries"))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall

}