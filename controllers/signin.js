
const handleSignin = (req, res, db, bcrypt) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      if (bcrypt.compareSync(req.body.password, data[0].hash) ) {
        return db.select('*').from('users')
          .where('email', "=", req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json("unable to get user"))
      } else {
        res.status(400).json("erro signing in")
      } 
    })
    .catch(err => res.status(400).json("error signing in "))
}

module.exports = {
  handleSignin : handleSignin
}