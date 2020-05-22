const Product = require("../models/product")
const formidable = require("formidable")//used for creating forms
const _ = require("lodash")
const fs = require("fs"); //comes up by default in nodejs and is used to access file in system 

exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("category")  //Getting products based on category
    .exec((err, product) =>{
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })
}; 

//This uses form data
exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();  //expects 3 parameters err, fileds which are the description and the file
    form.keepExtensions = true;  //keep the extensions like.png or .jpeg
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with input"
            });
        }

        //destructure the fields and adding restrictions
        const {name, description, price, category, stock} = fields //same as fields.price
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please include all the fields"
            })
        }

        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type 
        }

        //console.log(product)

        //save to the DB
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "Saving thshirt in DB failed"
                })
            }
            res.json(product)
        })
    });
};

exports.getProduct = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo =(req, res, next) =>{
    if(req.product.photo.data){
        res.set("Content-type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}