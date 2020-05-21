const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
    if(err){
        return res.status(400).json({
            error: "Category no found in DB"
        });
    }
    req.category = cate;
    next();
    });
};

exports.createCategory = (req,res)=> {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
            });
        }
        res.json({category});
    });
};

//Gives a specific category using the id defined in the middleware
exports.getCategory = (req,res) =>{
    return res.json(req.catgeory)
};

//Returns the entire obj
exports.getAllCategory = (req,res) =>{
    //When we simply call the find() it returns the entire obj
    Category.find().exec((err, categories) => {
        if (err){
            return res.status(400).json({
                error: "No categories found"
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req,res) => {
    const category = req.category;  //We are getting this category because of the middleware
    category.name = req.body.name;  //This line is used in getting the category from the frontend
    
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            });
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfully deleted"
      });
    });
  };
  


  