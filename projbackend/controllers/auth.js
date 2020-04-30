//NOTE: as practise route and controller file name should be same

const User = require("../models/user");  //use the variable name same as exported in model as a good practise

exports.signup = (req,res)=>{
    console.log("REQ BODY",req.body); //we are able to do this because of bodyparser in app.js  
    /*res.json({
        message: "signup works ..!"
    });*/

    const user = new User(req.body) /* an object user is created from a class User which is further created by mongoose we can access
    all the database methods mongoose provides us */

    user.save((err,user) =>{
        if(err){
            return res.status(400).json({
                err: "NOT able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        }); 
    })

};

exports.signout = (req,res)=>{
    //res.send("user signout");  We can either send a response or a json object with key value pairs 
    res.json({
        message: "User signout",
    })
};

