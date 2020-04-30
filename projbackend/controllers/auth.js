//NOTE: as practise route and controller file name should be same


exports.signup = (req,res)=>{
    console.log("REQ BODY",req.body); //we are able to do this because of bodyparser in app.js  
    res.json({
        message: "signup works ..!"
    });
};

exports.signout = (req,res)=>{
    //res.send("user signout");  We can either send a response or a json object with key value pairs 
    res.json({
        message: "User signout",
    })
};

