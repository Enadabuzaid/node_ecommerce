const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");

// @desc GET List of Categories
// @route GET / api/vi/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(201).json({ resulte: categories.length, data: categories });
});

// @desc GET specific Category by id
// @route GET / api/vi/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ msg: `No Category for this id ${id}` });
  }

  res.status(200).json({ data: category });
});

// @desc Create Category
// @route POST / api/vi/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc update Spicific Category
// @route PUT / api/vi/categories/:id
// @access Private

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    res.status(404).json({ msg: `No Category for this id ${id}` });
  }

  res.status(200).json({ data: category });
});

// @desc DELETE Spicific Category
// @route DELETE / api/vi/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: `No Category for this id ${id}` });
  }

  res.status(204).send();
});
