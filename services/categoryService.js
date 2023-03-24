const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");

// @desc GET List of Categories
// @route GET / api/vi/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page =  req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(201).json({ resulte: categories.length, data: categories });
});

// @desc GET specific Category by id
// @route GET / api/vi/categories/:id
// @access Public
exports.getCategory = (asyncHandler (async(req, res ) => {
    const {id} = req.params
    const category = await CategoryModel.findById(id);
    if(! category){
        res.status(404).json({msg : `No Category for this id ${id}`})
    }

    res.status(200).json({data : category})

}));

// @desc Create Category
// @route POST / api/vi/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
