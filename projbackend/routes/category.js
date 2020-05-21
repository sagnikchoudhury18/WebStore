const express = require("express")
const router = express.Router()

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category")
const {isAuthenticated, isAdmin, isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//Middlewares params to extract details
router.param("userId", getUserById);
router.param("categoryId",getCategoryById);

//Actual routes 

//Create routes
router.post(
    "/category/create/:userId", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createCategory
    );

//Read routes
//Gets all categories at once
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

//Update routes
router.put(
    "/category/:categoryId/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    updateCategory
    );

//Delete route
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    removeCategory
    );


module.exports = router;