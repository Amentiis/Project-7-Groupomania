const Post = require('../models/post')
const fs = require('fs')

var mongoose = require('mongoose');


exports.CreateComment = (req, res, next) => {
  const postObject = req.body;
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
    date : current_date,
});
	

  Post.updateOne({ _id: req.params.id }, {
    $push: {commentary_list: { _id: mongoose.Types.ObjectId(), text: req.body.text , firstname : req.body.firstname, lastname : req.body.lastname , userId : req.body.userId , date : current_date }},
  })
  .then(() => res.status(200).json({ message: 'Commentaire crée !'}))
  .catch(error => res.status(400).json({ error }));
    

}



exports.DeleteComment = (req, res, next) => {
  var commentId = mongoose.Types.ObjectId(req.body.commentId);
  var itsmypost = false;
  Post.findOne({ _id: req.params.id})
  .then(post => {
    for(let i in post.commentary_list){
      if((post.commentary_list[i]._id.toString()) == commentId){
        if(post.commentary_list[i].userId == req.auth.userId)
        itsmypost = true;
        break
      }
    }
      if ((post.userId != req.auth.userId) && (req.auth.userId != '63178ba24527038ff945fee1') && !itsmypost) {
      res.status(401).json({message: 'Not authorized'});
      } else {
          Post.updateOne({_id: req.params.id}, {$pull: {commentary_list: {_id: commentId}}})
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
          }
      }
  )
  .catch( error => {
      res.status(500).json({ error });
  });
};
