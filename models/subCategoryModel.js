const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Sub Category must be unique"],
      minlength: [3, "Too short Sub category name"],
      maxlength: [32, "Too long Sub category name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Sub Category must belong to parent Category"],
    },
  },
  {
    timestamps: true,
  }
);

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategoryModel;
