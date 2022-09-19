const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            lastname : req.body.lastname,
            firstname :  req.body.firstname,
            email : req.body.email,
            password : hash,
        });
        user.save()
        .then(() => res.status(201).json ({message: 'utilisateur créé ! '}))
        .catch(error => res.status(500).json({error : "problème création de compte"}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200)
            
            .json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                "IMASECRETKEY",
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.getSpecifyUser = (req, res, next) => {
    User.findOne({ _id: req.body._id })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }else{
          res.status(200).json({
            lastname: user.lastname,
            firstname: user.firstname,
            isAdministrator : user.isAdministrator
            
          });
        }
      }).catch(error => res.status(500).json({ error }));
      
  };

  exports.getSpecifyUserAll = (req, res, next) => {
    User.findOne({ _id: req.body._id })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }else{
          res.status(200).json({
            lastname: user.lastname,
            firstname: user.firstname,
          });
        }
      }).catch(error => res.status(500).json({ error }));
      
  };

  exports.modifySpecifyUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }else{
          bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            User.updateOne({ _id: req.params.id },  
              {
                firstname : req.body.firstname,
                lastname: req.body.lastname
              })
                .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));

              };
      }).catch(error => res.status(500).json({ error }));
      
  };