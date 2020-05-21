const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//We need isSignedIn and isAuthenticated with put req as user can only change stuff when logged in and only in his account, also put is used for updating
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)  


router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)  

//To get all the users
router.get("/users", getAllUsers);


module.exports = router;
