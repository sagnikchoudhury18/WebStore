var mongoose = require('mongoose');
var crypto = require('crypto');
var uuidv1 = require('uuid/v1');


var userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    lastname:{
        type: String,
        maxlength: 32,
        trim: true
    },

    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    userinfo: {
        type: String,
        trim: true
    },

    //TODO
    encry_password:{  //this  is being stored in db
        type: String,
        required: true
    },

    salt: String, //for password

    role:{
        type:Number,
        default: 0
    },

    purchases: {
        type: Array,
        default: []
    }
    
  },
  {timestamps:true}
);


userSchema
    .virtual("password")
    .set(function(password){
         this._password = password  //in javascript private var is defined with an _
         this.salt = uuidv1();
         this.encry_password = this.securePassword(password);
    })
    .get(function(){ //to get the password
        return this._password;
    })

userSchema.methods = {
    authenticate:  function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;  //if match is happening in password it will return true else false
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{  
            return crypto
            .createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    }
  };

  module.exports = mongoose.model("User",userSchema) //what we want to call the userSchema as is mentioned within " "