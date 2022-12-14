const Post = require('../models/post')
const fs = require('fs')
require("dotenv").config();


exports.ModifyPost =  (req, res, next) => {
  const postObject = req.body;

  function isFile(){
    if(!req.file){
      return "";
    }else{
      return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
  }

  Post.findOne({ _id: req.params.id})
  .then(post => {
    if ((post.userId != req.auth.userId) && (req.auth.userId != process.env.ADMIN_USER_ID)) {
          res.status(401).json({message: 'Not authorized'});
      }else{
        if(req.body.imageexiste){
          Post.updateOne({ _id: req.params.id }, 
            {...postObject,_id: req.params.id,})
              .then(() => res.status(200).json({ message: 'Objet modifié !'}))
              .catch(error => res.status(400).json({ error }));
        }else{
          if (post.imageUrl){
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.updateOne({ _id: req.params.id }, 
              {...postObject,_id: req.params.id,imageUrl: isFile(),})
                .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ error }));
            });
        }else{
          Post.updateOne({ _id: req.params.id }, 
            {...postObject,_id: req.params.id,imageUrl: isFile(),})
              .then(() => res.status(200).json({ message: 'Objet modifié !'}))
              .catch(error => res.status(400).json({ error }));
            }
      }
    }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
  };



