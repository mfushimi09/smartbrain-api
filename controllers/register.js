
const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  var salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginemail => {
      return trx('users')
      .returning('*')
      .insert({
        email: loginemail[0],
        name: name,
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json("unable to register"))

}

module.exports = {
  handleRegister: handleRegister
}