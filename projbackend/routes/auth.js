var express = require('express');
var router = express.Router();

const {signup,signout} = require("../controllers/auth")

/*router.get("/signout", (req,res)=>{
    res.send("user signout");
})*/

//OR

/* //Now instead of writing this entire thing in route  we can add this section to controllers and get the result from there
signout = (req,res)=>{
    //res.send("user signout");  We can either send a response or a json object with key value pairs 
    res.json({
        message: "User signout",
        
    })
};  */

// Now inorder to get the result back from controller for the specific method in controller we need to require auth as mentioned above
router.post("/signup", signup);
router.get("/signout", signout); 

module.exports = router;
/*To throw all the requests which means that there is some file existing where routes are defined and we need to throw 
the result back to app.js */    

