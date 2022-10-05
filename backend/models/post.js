const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  firstname : { type: String, required: true },
  lastname: { type: String, required: true },
  text : { type: String, required: true },
  imageUrl: { type: String, required: false },
  likes: { type: Number, required: false },
  usersLiked: { type: [], required: false },
  date : { type: String, required : true },
  commentary_list: { type: [{
    _id : {type : Object},
    text : {type : String},
    firstname : {type : String},
    lastname : {type : String},
    userId : {type : String},
    date : {type : String},
  }
    
  ] , required: false },
  });

module.exports = mongoose.model('Post', postSchema);