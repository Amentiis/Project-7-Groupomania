const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    lastname : {type : String , require : true },
    firstname : {type : String , require : true},
    email : {type : String , require : true , unique : true},
    password : {type : String , require : true},
    isAdministrator : {type : Boolean , default: false , require : false },
    iconurl: { type: String, required: false, default : 'https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png'},
}) 
 



module.exports = mongoose.model('User',userSchema);