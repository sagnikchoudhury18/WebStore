const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //TODO: get back here for password
  req.profile.salt = undefined;   //So that the salt and encry password is not shown in response
  req.profile.encry_password = undefined;
  return res.json(req.profile);

};

exports.getAllUsers = (req,res) =>{
  // Whenever we exec 
  User.find().exec((err,users)=>{
    if(err || !users){
      return res.status(400).json({
        error: "No users found"
      })
    }
    res.json(users);
  })
}
