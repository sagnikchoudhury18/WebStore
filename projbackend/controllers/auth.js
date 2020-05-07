//NOTE: as practise route and controller file name should be same

const User = require("../models/user");  //use the variable name same as exported in model as a good practise
const {check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


//Now in order to validate whatever is being stored in the db through backend we us express-validator
exports.signup = (req,res)=>{
    //console.log("REQ BODY",req.body); we are able to do this because of bodyparser in app.js  
    /*res.json({
        message: "signup works ..!"
    });*/

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors : errors.array()[0].msg
        })
    }
    const user = new User(req.body) /* an object user is created from a class User which is further created by mongoose we can access
    all the database methods mongoose provides us */
    user.save((err,user) =>{
        if(err){
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        }); 
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
  
      if (!user.authenticate(req.body.password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    });
  };



exports.signout = (req,res)=>{
    //res.send("user signout");  We can either send a response or a json object with key value pairs 
    res.json({
        message: "User signout",
    });
};

