const Post = require('../models/post')
const fs = require('fs')

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  delete postObject._id;
  delete postObject._userId;
  var date = new Date();
	
  var month = date.getMonth();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  switch (date.getMonth()+1) {
    case 1:
      month = 'Janvier'
      break;
    case 2:
      month = 'Février'
      break;
    case 3:
      month = 'Mars'
      break;
    case 4:
      month = 'Avril'
      break;
    case 5:
      month = 'Mai'
      break;
    case 6:
      month = 'Juin'
      break;
    case 7:
      month = 'Juillet'
      break;
    case 8:
      month = 'Août'
      break;
    case 9:
      month = 'Septembre'
      break;
    case 10:
      month = 'Octobre'
      break;
    case 11:
      month = 'Novembre'
      break;
    case 12:
      month = 'Décembre'
      break;
    default:
      break;
  }
  if(hours<10){
    hours = "0"+hours
  }

  if(minutes<10){
    minutes = "0"+minutes
  }
  var current_date = date.getDate() + " " +(month)+ " " + date.getFullYear() +" à " + hours +"h"+ minutes;

  const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      likes : 0,
      dislikes : 0,
      imageUrl: isFile(),
      date : current_date,
  });
  function isFile(){
    if(req.file === undefined){
      return;
    }else{
      return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
  }
  post.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};
  exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then(post => {
          if ((post.userId != req.auth.userId) && (req.auth.userId != '6332f583a71cc6f7749d2080')) {
                res.status(401).json({message: 'Not authorized'});
            } else {
              if (post.imageUrl){
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }else{
              Post.deleteOne({_id: req.params.id})
              .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
              .catch(error => res.status(401).json({ error }));
            }
          }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.GetAllPost = (req, res) => {
    Post.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
};

exports.GetSpecifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(404).json({ error }));
  };



  exports.LikePost = (req, res, next) => {
    switch (req.body.like){
        case 1 :
          Post.updateOne({ _id: req.params.id }, {
             $inc: { likes: 1 },
             $push: { usersLiked: req.body.userId },
             _id: req.params.id
          })
        .then(() => res.status(200).json({ message: 'post like !'}))
        .catch(error => res.status(400).json({ error }));
        break;
        case -1 :
          Post.updateOne({ _id: req.params.id }, {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
            _id: req.params.id
          })
        .then(() => res.status(200).json({ message: 'post dislike  !'}))
        .catch(error => res.status(400).json({ error }));
        break;
        case 0:
          Post.findOne({ _id: req.params.id })
            .then((post) => {
              if (post.usersLiked.find(user => user === req.body.userId)) {
                Post.updateOne({ _id: req.params.id }, {
                  $inc: { likes: -1 },
                  $pull: { usersLiked: req.body.userId },
                  _id: req.params.id
                })
                  .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
                  .catch((error) => { res.status(400).json({ error}); });
              } else if (post.usersDisliked.find(user => user === req.body.userId)) {
                Post.updateOne({ _id: req.params.id }, {
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: req.body.userId },
                  _id: req.params.id
                })
                  .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
                  .catch((error) => { res.status(400).json({ error}); });
              }
            })
            .catch((error) => { res.status(404).json({error}); });
          break;
      }
    }



