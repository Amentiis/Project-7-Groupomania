const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    lastname : {type : String , require : true },
    firstname : {type : String , require : true},
    email : {type : String , require : true , unique : true},
    password : {type : String , require : true},
    isAdministrator : {type : Boolean , default: false , require : false },
    iconurl: { type: String, required: false, default: ""},
}) 
 



module.exports = mongoose.model('User',userSchema);