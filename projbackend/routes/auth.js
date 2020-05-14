var express = require('express');
var router = express.Router();

const {check, validationResult} = require("express-validator")
const {signup,signout,signin,isSignedIn} = require("../controllers/auth")

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
router.post("/signup", 
    [
        check("name").isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        check("email").isEmail().withMessage('must be at least 5 chars long'),
        check("password").isLength({ min: 3 }).withMessage('should be atleast 3 characters'),
    ], //all that is mentioned within square brackets is for validation
    signup
);

router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 3 })
    ],
    signin
  );

router.get("/signout", signout); 

router.get("/testroute",isSignedIn, (req,res)=>{ //Since this is not a custom middleware therefore we do not have the next
    res.json(req.auth);  //auth contains the _id which is same as the id assigned when signed in
});

module.exports = router;
/*To throw all the requests which means that there is some file existing where routes are defined and we need to throw 
the result back to app.js */    

