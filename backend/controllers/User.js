const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')

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
            isAdministrator : user.isAdministrator,
            iconurl : user.iconurl,
            
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
            iconurl : user.iconurl, 
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



  exports.ModifyPicture =  (req, res, next) => {
    function isFile(){
      if(!req.file){
        return "";
      }else{
        return `${req.protocol}://${req.get('host')}/images/profilepicture/${req.file.filename}`
      }
    }
    User.findOne({ _id: req.body._id})
    .then(user => {
      if ((user._id != req.auth.userId) && (req.auth.userId != '63178ba24527038ff945fee1')) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            if (user.iconurl){
              const filename = user.iconurl.split('/images/profilepicture')[1];
              fs.unlink(`images/profilepicture/${filename}`, () => {
                user.updateOne({ _id: req.body._id , iconurl: isFile()})
                    .then(() => res.status(200).json({ iconurl : isFile()}))

                    .catch(error => res.status(400).json({ error }));
                   
              });
            }else{
              user.updateOne({ _id: req.body._id , iconurl: isFile()})
              .then(() => res.status(200).json({ iconurl : isFile()}))
                    .catch(error => res.status(400).json({ error }));
                    res.status(200).json({
                      iconurl : isFile(),
                      
                    });
            }
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
    };