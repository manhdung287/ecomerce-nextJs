import mongoose from "mongoose";

const ProductSechma = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    price1: {
      type: Number,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
    },
    inStock: {
      type: Number,
      require: true,
    },
    images: {
      type: Array,
      default: false,
    },
    content:{
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    checked: {
      type: Boolean,
      require: true,
    },
    isHot:{
      type: Boolean,
      require: true,
    },
    sold: {
      type: Number,
      require: true,
    },
    size:{
      type: String,
      require: true, 
    }
  },
  {
    timestamps: true,
  }
);

let DataSet =
  mongoose.models.products || mongoose.model("products", ProductSechma);

export default DataSet;
